<script setup>
</script>
<template>
    <div class="main_menu">
        <div class="main_menu_container">
            <div class="element_link">
                <img src="../assets/LEAFY_logo.png" alt="leafy_icon" class="leafy_icon">
                <div class="container_link">
                    <button class="link">
                        Home
                    </button>
                    <button class="link">
                        Shop
                    </button>
                    <button class="link">
                        Gallery
                    </button>
                    <button class="link">
                        About
                    </button>
                    <button class="link">
                        Contract
                    </button>    
                </div>
                
                
            </div>
            <div class="element_service"> 
                <div class="service_container_search">
                    <img class="search_icon" src="../assets/vue.svg" alt="search_icon">
                    <input type="text" placeholder="Search">
                </div>
                <button class="service_sign-in">
                        Sign in
                    </button>    
            </div>
        </div>
        
    </div>
</template>
<style scoped>
*{
    font-size: 16px;
    font-weight: 700;
    
}
.main_menu{
    width:100%;
    height:80px;
    
    margin:auto;
    background-color: white;
}
.main_menu_container{
    width:100%;
    height:100%;
    
    margin:auto;
    
    display: flex;
}
.element_link{
    flex-grow:8;
    display: flex;
    padding:10px;
    margin:auto;
    width: fit-content;
    height:fit-content;
    
    justify-content: center;

    
}
.leafy_icon{
    width:114px;
    height:27px;
    padding-right:10px;
    margin:auto 0 auto 0;
}
.container_link{
    display:flex;
    padding:8px 0px 8px 0px;
    
}
.link{
    padding: 3px;
    margin:0px 15px 0px 15px;
    
    width:fit-content;
    height: fit-content;

    color:#252525;
    cursor: pointer;
    border:none;
}

.link:focus{
    color:#26AC34;
}

.element_service{
    flex-grow:6;
    padding:10px;
    display:flex;
    width: fit-content;
    height:fit-content;
    margin:auto;
}
.service_container_search{
    display:flex;
}
.search_icon{
    width:20px;
    height: 20px;
    margin:auto 3px auto 3px;
}
input{
    width:200px;
    height:40;
    padding:6px;
    font-weight: 300;
    border:none;
    /* border-radius: ; */
    outline:inherit;
}

.service_sign-in{
    width:77px;
    height:40px;
    border:none;
    padding:8px, 12px, 8px, 12px;
    border-radius: 4px;
    background-color: #26AC34;
    color:#FFFFFF;
    font-weight: 500;
    cursor: pointer;
}
.service_sign-in:hover{
    background-color: gray;
}
</style>