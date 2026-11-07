export default {
    template : `
        <div class="row">
            <div class="col-md-4 offset-md-4">        
                <h3>Create account</h3>
                <p class="sub">Join as a customer or a professional.</p>
                <div v-if="message" :class="'alert alert-' + category" role="alert">
                    {{ message }}
                </div>
                <form @submit.prevent="submitRegister">
                    <div class="form-group">
                        <label for="username">Username:</label>
                        <input type="text" id="username" v-model="username" required> 
                    </div>
                    <div class="form-group">    
                        <label for="password">Password:</label>
                        <input type="password" id="password" v-model="password" required> 
                    </div> 
                    <div class="form-group">
                        <label for="role">Select Role:</label>
                        <select v-model="role" id="role" >
                            <option value="customer">Customer</option>
                            <option value="professional">Professional</option>
                        </select>
                    </div>    
                    <div class="form-group text-center">       
                        <input type="submit" value="Register" class="btn btn-primary">
                        <router-link to="/login" class="btn btn-secondary">Cancel</router-link>  
                    </div>    
                </form>
            </div>
        </div>
    `,
    data(){
        return {
            username: null,
            password: null,
            role : null,
            message: null,      
            category: null,            
        } 
    },
    methods : {
        async submitRegister(){
            try{
                const res = await fetch(location.origin+'/register', 
                    {method : 'POST', 
                        headers: {'Content-Type' : 'application/json'}, 
                        body : JSON.stringify({'username': this.username,'password': this.password, 'role' : this.role})
                    })
                if (res.ok){
                    const data = await res.json();
                    this.message = data.message; 
                    this.category = data.category;
                }else{
                    const errorData = await res.json();  
                    this.message = errorData.message; 
                    this.category = errorData.category;
                }
            }catch (error){
                    this.message = 'An unexpected error occurred.';
                    this.category = 'danger';
            }            
        }
    }
}