<script setup>
import js from '../../JS/validation.js'
//950
//(window.innerWidth*288)/1440
const amountMove=undefined
const designerList =[
    {name : "Susa baka",description : "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Loremasdfasdfnasdnflkasdj asdlkfjalsdjfoasdjfoiwqjrteksflgj slkdjkfoj "},
    {name : "Susa baka",description : "It is a long established fact "},
    {name : "Susa baka",description : "It is a long established fact that a reader will be distracted by the readable content of"},
    {name : "Susa baka",description : "It is a "},
    {name : "Susa baka",description : "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem sd "},
    {name : "Susa baka",description : "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. "},
    {name : "Susa baka",description : "It is a long established fact that a reader will be distracted by the readable content of a page when "},
    {name : "Susa baka",description : "It is a long established fact that a reader will be distracted by the readable "},
    {name : "Susa baka",description : "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem "},
    {name : "Susa baka",description : "It is a long "},

]

</script>
<template>
<div class="wrapper_designer">
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
                    <div>
                        <p>
                            {{ designer.description }}    
                        </p>
                    </div>
                    
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
</div>
</template>
<style scoped>

.wrapper_designer{
    width:auto;
    height:min(33.056dvw,476px);
    background-color: inherit;
    padding: min(4.167dvw,60px) min(11.111dvw,160px);
    box-sizing: border-box;
    
}
.container_designer{
    display:flex;
    position:relative;
    width: 100%;
    height:100%;
    align-items: center;
    justify-content: center;
    /* gap: min(2.222dvw,32px); */
    background-color: inherit;
    /* border: 3px solid pink; */
    
    
}
.wrapper_list{
    /* position:relative; */
    /* display: flex; */
    /* align-items: center; */
    /* width:1002px;  */
    /* width: auto; */
    width: min(68.889vw,992px);
    height: min(24.722dvw,356px);
    overflow-x: auto;
    scroll-behavior: smooth;
    box-sizing: border-box;
    /* border: 3px solid yellow; */
}
.wrapper_list::-webkit-scrollbar{
    display: none;
}
.designer_list{
    display: flex;

    flex-direction: row;
    width:fit-content;
    height:inherit;
    margin-inline:min(2.222dvw,32px);
    justify-content: center;
    align-items: center;
    gap: min(2.222dvw,32px);
    /* background-color: red; */
    /* overflow:auto; */
    
    /* overflow-y: hidden; */
}


.designer{
    width:min(20dvw,288px);
    /* height:356px; */
    height:min(24.722dvw,356px);

    display: flex;
    flex-direction: column;
    padding: min(1.389dvw,20px);
    /* margin:3px; */
    background-color: white;
    text-align: center;
    border-radius: 8px;
    box-sizing: border-box;
    box-shadow: 0px 4px 40px 0px rgba(4, 6, 15, 0.08);

}
.designer .user_img{

    width:min(6.944dvw,100px);
    height:min(6.944dvw,100px);
    margin:0px auto 0px auto;
    overflow:hidden;
    border-radius: 50%;
    background-color: rgb(167, 167, 167);
}
.designer .user_img img{
    width:inherit;
    height:inherit;
    margin:auto;
}
.designer h3{
    width:100%;
    height: fit-content;
    margin-top:min(1.111dvw,16px) ;
    font-size:min(1.25dvw,18px);
    color: #26AC34;
    overflow: hidden;
    text-overflow: ellipsis;
}
.designer div{
    width: 100%;
    height: min(8.333dvw,120px);
    overflow: hidden;
}
.designer div p{
    width:inherit;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    font-size:  min(1.111dvw,16px);
    overflow: hidden;
}

.designer button{
    width:min(4.167dvw,60px);
    height:min(2.5dvw,36px);
    margin:min(1.111dvw,16px) auto 0px auto;
    font-size:min(0.972dvw,14px);
    background-color: white;
    border-color:#E0E0E0;
    border: 1px solid;
    border-radius: 4px;
    box-sizing: border-box;
}
.designer button:hover{
    background-color: gray;
}
.scroll_button{
    width:min(4.444dvw,64px);
    height:min(4.444dvw,64px);
    border:none;
    border-radius: 50%;
    background-color: inherit;
    /* position:absolute; */
    /* left:220px;
    top:40%; */
}
.scroll_button img {
    width: inherit;
    height: inherit;
}
.scroll_button:hover{
    background-color:gray;
}

@media (width <=744px){
    .wrapper_designer{
        height: min(52.151dvw,388px);
        padding: min(8.065dvw,60px) min(5.914dvw,44px);
        /* gap: clamp(1.111dvw,16px); */
    }

    .wrapper_list{
        width: min(79.57dvw,592px);
        height: min(36.022dvw,268px);
       
    }
    .designer_list{
        margin-inline:min(2.151dvw,16px);
        gap: min(2.151dvw,16px);
    }
    .designer{
        width: min(23.656dvw,176px);
        height: min(36.022dvw,268px);
        padding:min(2.151dvw,16px);
    }
    .designer .user_img{
        width: min(10.753dvw,80px);
        height: min(10.753dvw,80px);
    }
    .designer h3{
        font-size: min(2.151dvw,16px);
        margin-top: min(1.613dvw,12px);
    }
    .designer div{
        height: min(10.753dvw,80px);
    }
    .designer div p{
        -webkit-line-clamp: 4;
        font-size: min(1.882dvw,14px);
    }
    .designer button{
        width: min(7.392dvw,55px);
        height: min(3.226dvw,24px);
        font-size: min(1.613dvw,12px);
        margin-top: min(1.613dvw,12px);
    }
    .scroll_button{
        width: min(4.301dvw,32px);
        height: min(4.301dvw,32px);
        
    }
    .scroll_button img{
        width: min(2.151dvw,16px);
        height: min(2.151dvw,16px);
    }
}

@media (width<=376px){
    .wrapper_designer{
        height: min(71.277dvw,268px);
        padding: min(7.447dvw,28px) min(3.191dvw,12px);
    }
    .wrapper_list{
        width: min(93.617dvw,352px);
        height: min(56.383dvw,212px);
    }
    .designer_list{
        margin-inline:(2.128dvw,8px);
        gap:min(2.128dvw,8px);
    }
    .designer{
        width:min(44.681dvw,168px);
        height: min(56.383dvw,212px);
        padding: min(2.128dvw,8px);
    }
    .designer .user_img{
        width: min(21.277dvw,80px);
        height:min(21.277dvw,80px) ;
    }
    .designer h3{
        font-size: min(3.191dvw,12px);
        margin-top: min(2.128dvw,8px);
    }
    .designer div{
        height: min(15.957dvw,60px);
    }
    .designer div p{
        -webkit-line-clamp: 3;
        font-size: min(3.191dvw,12px);
    }
    .designer button{
        width: min(14.628dvw,55px);
        height: min(6.383dvw,24px);
        font-size: min(3.191dvw,12px);
        margin-top: min(2.128dvw,8px);
    }
    .scroll_button{
        display: none;
    }
}   

</style>