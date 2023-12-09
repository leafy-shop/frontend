<script setup>
import js from '../../JS/validation.js'

const amountMove=950
const designerList =[
    {name : "Susa baka",description : "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem "},
    {name : "Susa baka",description : "It is a long established fact "},
    {name : "Susa baka",description : "It is a long established fact that a reader will be distracted by the readable content of"},
    {name : "Susa baka",description : "It is a "},
    {name : "Susa baka",description : "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem "},
    {name : "Susa baka",description : "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. "},
    {name : "Susa baka",description : "It is a long established fact that a reader will be distracted by the readable content of a page when "},
    {name : "Susa baka",description : "It is a long established fact that a reader will be distracted by the readable "},
    {name : "Susa baka",description : "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem "},
    {name : "Susa baka",description : "It is a long "},

]

</script>
<template>
    <div class="container_designer">
        <button @click="js.scroll('previous','.wrapper_list',amountMove)" class="scroll_button pre" >
            <img src="../../assets/home_p/icon/left.png" alt="previous">
        </button>
        <div class="wrapper_list">
            <div class="designer_list">
                <div v-for="(designer,index) in designerList " :key="index" class="designer">
                    <div class="user_img">
                        <img src="../../assets/home_p/I.jpg" alt="user_img">
                    </div>
                    <h3>
                        {{designer.name}}
                    </h3>
                    <p>
                        {{ designer.description }}    
                    </p>
                    <button>
                        View
                    </button>
                    
                </div> 
            </div>
        </div>
        <button @click="js.scroll('next','.wrapper_list',amountMove)" class="scroll_button next">
            <img src="../../assets/home_p/icon/right.png" alt="next">
        </button>
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
    height:476px;
    align-items: center;
    justify-content: center;
    gap: 32px;
    background-color: inherit;
}
.wrapper_list{
    position:relative;
    display: flex;
    align-items: center;
    width:1002px; 
    height: 100%;
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
    margin:0px 32px 0px 32px;
    justify-content: center;
    align-items: center;
    gap: 32px;
    /* background-color: red; */
    /* overflow:auto; */
    
    /* overflow-y: hidden; */
}


.designer{
    width:288px;
    height:356px;
    display: flex;
    flex-direction: column;
    padding: 20px;
    /* margin:3px; */
    background-color: white;
    text-align: center;
    border-radius: 8px;
    box-sizing: border-box;
    box-shadow: 0px 4px 40px 0px rgba(4, 6, 15, 0.08);

}
.designer .user_img{

    width:100px;
    height:100px;
    margin:auto;
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
    width:100%;
    height: fit-content;
    margin-top:16px ;
    font-size:18px;
    color: #26AC34;
    overflow: hidden;
    text-overflow: ellipsis;
}
.designer p{
    width:100%;
    height: 120px;

    font-size: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: pre-wrap;
    word-break: break-word;
}

.designer button{
    width:60px;
    height:36px;
    margin:16px auto 0px auto;
    font-size:14px;
    background-color: white;
    border-color:#E0E0E0;
    border: 1px solid;
    border-radius: 4px;
    
}
.designer button:hover{
    background-color: gray;
}
.scroll_button{
    width:64px;
    height:64px;
    border:none;
    border-radius: 50%;
    background-color: inherit;
    /* position:absolute; */
    /* left:220px;
    top:40%; */
}
.scroll_button img {
    width: 32px;
    height: 32px;
}
.scroll_button:hover{
    background-color:gray;
}


</style>