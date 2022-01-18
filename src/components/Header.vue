<template>
    <div id="header">
        <div id="header-left">
            <router-link to="/index"><div id="header-logo">映画採点</div></router-link>
        </div>
        
        <div v-if="isSignedIn" id="header-right">
            
            <el-dropdown trigger="click">
                <el-row>
                <el-col :span="12">
                    <div id="header-right-img">
                        <el-avatar size="large" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                    </div>
                </el-col>
                <el-col :span="12">
                    <h2>name</h2>
                </el-col>
                </el-row>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item><el-button type="text" @click="tomypage">MyPage</el-button></el-dropdown-item>
                    <el-dropdown-item><el-button type="text" @click="phototest">phototest</el-button></el-dropdown-item>
                    <el-dropdown-item><el-button type="text" @click="test">test</el-button></el-dropdown-item>
                    <el-dropdown-item><el-button type="text" @click="signout">SignOut</el-button></el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <div v-else id="header-right">
            <div id="header-rightb">
                <router-link to="/signin">ログイン/登録</router-link>
            </div>
        </div>
    
    </div>
</template>

<script>
import Auth from "@aws-amplify/auth"
export default {
    name: 'myHeader',
    data(){
        
        return {

        }
    },
    methods: {     
        signout() {
            return  Auth.signOut()
        },
        tomypage() {
            this.$router.push('/userpage');
        },
        phototest() {
            this.$router.push('/photo/create');
        },
        test() {
            console.log("rest");
            console.log(this.$store.user);
        }
    },
   computed: {
      isSignedIn() {
        return this.$store.state.user !== null;
      },
    },
}
</script>

<style>
#header {
    background-color: #26d0c9;
    color: #fff;
    height: 65px;
}

#header-logo{
    float: left;
    font-size: 30px;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 20px;
    padding-right: 40px;
    color:white;
}

#header-logo:hover{
    color: rgb(192, 230, 255);
}
#header-left {
    float: left;
}

#header-right {
    float: right;
    background-color: rgba(255, 255, 255, 0.3);
    /* transitionを指定してください */
    transition: all 0.5s;
    width: 150px;
    height: 65px;
    display: inline;
}

#header-right:hover {
    background-color: rgba(255, 255, 255, 0.5);
}

#header-right-img {
    float: right;
    padding-top: 13px;
    padding-left: 20px;
    text-align: center;
  
}
#header-right h2 {
    color:white;
  
}

#header-rightb {
    font-size: 20px;
    line-height: 65px;
    padding-left: 10px;
    padding-right: 10px;
    color: white;
    display: inline;
  
}

#header-right a{
    color: white;
    text-decoration: none;
}

#header-right a:hover{
    color: rgb(192, 230, 255);
}

.router-link-active{
    color: rgb(255, 192, 192);
}
#el-dropdown-link{
    float: left;
    padding-top: 20px;
    padding-bottom: 20px;
}



</style>