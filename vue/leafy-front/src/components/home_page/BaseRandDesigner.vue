<script setup>
import js from '../../JS/function.js'

const scroll =(type)=>{
    const designerList = document.querySelector(".wrapper_list")
    const direction= type==="previous"?-1:1
    const scrollAmount = designerList.clientWidth*direction
    console.log("scroll Amout :"+scrollAmount)
    designerList.scrollBy({left:scrollAmount,behavior:"smooth"})
    
    console.log(type)
    // console.log(n)
}
const testing=()=>{
    js.function_Status('scroll',false,'selector_name and type must not undefined !')
}
</script>
<template>
    <div class="container_designer">
        <div class="wrapper_list">
            <div class="designer_list">
                <div v-for="index in 5" class="designer">
                    <div class="user_img">
                        <img src="../../assets//vue.svg" alt="user_img">
                    </div>
                    <h3>
                        Namedfgdgdfgdfgsdfsdfsdfsfsdfsdfsdfsdf
                    </h3>
                    <p>
                        Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur,                  </p>
                    <button>
                        View
                    </button>
                    
                </div> 
            </div>
        </div>
        <button @click="js.scroll('previous','.wrapper_list')" class="scroll_button_pre" >previous</button>
        <button @click="js.scroll('next','.wrapper_list')" class="scroll_button_next">next</button>
    </div>
</template>
<style scoped>
*{
    box-sizing:content-box;
}
.container_designer{
    display:flex;
    position:relative;
    width:auto;
    height:504px;
    align-items: center;
  justify-content: center;
}
.wrapper_list{
    /* overflow-x: scroll; */
    position:relative;
    width:928px;
    height: fit-content;
    /* background-color: red; */
    overflow-x: auto;
    scroll-behavior: smooth;
}
.wrapper_list::-webkit-scrollbar{
    display: none;
}
.designer_list{
    display: flex;

    flex-direction: row;
    width:fit-content;
    height:fit-content;
    margin:auto 3% auto 3%;
    justify-content: center;
    align-items: center;
    gap: 1%;
    /* background-color: red; */
    /* overflow:auto; */
    
    /* overflow-y: hidden; */
}


.designer{
    width:288px;
    height:380px;
    display: flex;
    flex-direction: column;
    margin:3px;
    background-color: white;
    text-align: center;
    

}
.designer .user_img{
    display: flex;
    width:100px;
    height:100px;
    margin:auto;
    justify-content: center;
    align-items: center;
    overflow:hidden;
    border-radius: 50%;
    background-color: rgb(167, 167, 167);
}
.designer .user_img img{
    width:100px;
    height:100px;
    margin:auto;
}
.designer h3{
    width:80%;
    height: fit-content;
    margin:6px auto 6px auto;
    font-size:18px;
    color: #26AC34;
    overflow: hidden;
    text-overflow: ellipsis;
}
.designer p{
    width:248px;
    height:119px;
    margin:auto;
    font-size: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: pre-wrap;
    word-break: break-word;
}

.designer button{
    width:60px;
    height:36px;
    margin:auto;
    font-size:14px;
    background-color: inherit;
    border:#E0E0E0;
}

.scroll_button_pre{
    width:64px;
    height:64px;
    border:none;
    border-radius: 50%;
    position:absolute;
    left:220px;
    top:40%;
}
.scroll_button_pre:hover{
    background-color:gray;
}

.scroll_button_next{
    width:64px;
    height:64px;
    border:none;
    border-radius: 50%;
    position:absolute;
    right:220px;
    top:40%;
}
.scroll_button_next:hover{
    background-color:gray;
}
</style>