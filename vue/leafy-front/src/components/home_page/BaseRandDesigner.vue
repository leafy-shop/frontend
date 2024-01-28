<script setup>
import { onBeforeMount, ref } from 'vue';
import js from '../../JS/validation.js'
import fetch from '../../JS/api.js'
import {useRouter}from 'vue-router'
let origin = `${import.meta.env.VITE_BASE_URL}`;

const myRouter = useRouter()
const goGalleryDetail=(id)=>myRouter.push({name:'GalleryDetail',params:{id:id}})

const designerList = ref([])

//950
//(window.innerWidth*288)/1440
const amountMove=undefined
// const designerList = [
//     {name : "Susa baka",description : "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Loremasdfasdfnasdnflkasdj asdlkfjalsdjfoasdjfoiwqjrteksflgj slkdjkfoj"},
//     {name : "Susa baka",description : "It is a long established fact"},
//     {name : "Susa baka",description : "It is a long established fact that a reader will be distracted by the readable content of"},
//     {name : "Susa baka",description : "It is a "},
//     {name : "Susa baka",description : "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem sd "},
//     {name : "Susa baka",description : "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. "},
//     {name : "Susa baka",description : "It is a long established fact that a reader will be distracted by the readable content of a page when "},
//     {name : "Susa baka",description : "It is a long established fact that a reader will be distracted by the readable "},
//     {name : "Susa baka",description : "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem "},
//     {name : "Susa baka",description : "It is a long "},
// ]

const getGardenDesigner=async()=>{
    let {status,data} = await fetch.getGardenDesigner()
    // console.log(designerList.value)
    console.log(data.list)
    designerList.value=data.list
}

onBeforeMount(()=>{
    getGardenDesigner()
})

</script>
<template>
<div class="wrapper_designer">
    <div class="container_designer">
        <div class="scroll_button">
        <button @click="js.scroll('previous','.wrapper_list',amountMove)" class=" pre" >
                <!-- <img src="../../assets/home_p/icon/left.png" alt="previous"> -->
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">
                    <path d="M19.9998 25.3334L10.6665 16.0001L19.9998 6.66675" stroke="#212121" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
        </div>
        <div class="wrapper_list">
            <div class="designer_list">
                <div  v-for="(designer,index) in designerList " :key="index" class="designer">
                    <div class="user_img">
                        <img v-if="designer.image" :src="`${origin}/api/image/users/${designer.userId}/${designer.image}`" alt="user_img">
                        <img v-else src="./../../assets/icon/user_icon.png" alt="user_img">
                    </div>
                    <div>
                        <h3>
                            {{designer.name}}
                            Test
                        </h3>
                        <p>
                            {{ designer.description }}    
                        </p>
                    </div>
                    
                    <button @click="goGalleryDetail(designer.userId)">
                        View
                    </button>
                    
                </div> 
            </div>
        </div>
        <div class="scroll_button">
            <button @click="js.scroll('next','.wrapper_list',amountMove)" class=" next">
                <!-- <img src="../../assets/home_p/icon/right.png" alt="next"> -->
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">
                    <path d="M12 6.66675L21.3333 16.0001L12 25.3334" stroke="#212121" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
        </div>
    </div>
</div>
</template>
<style scoped>
*{
    box-sizing: border-box;
}
.wrapper_designer{
    width: auto;
    height: min(33.056dvw,476px);
    background-color: inherit;
    padding: min(4.167dvw,60px) min(11.111dvw,160px);
    box-sizing: border-box;
}
.container_designer{
    display: flex;
    position: relative;
    /* width: 100%; */
    /* width: min(77.778, 1120px); */
    width: auto;
    height: fit-content;
    align-items: center;
    justify-content: center;
    gap: min(2.222dvw,32px);
    background-color: inherit;
    /* border: 3px solid pink; */
}
.wrapper_list{
    /* position:relative; */
    /* display: flex; */
    /* align-items: center; */
    /* width:1002px;  */
    /* width: auto; */
    /* width: min(68.889vw,992px); */
    /* width: min(77.778, 1120px); */
    height: min(25dvw,360px);
    overflow-x: scroll;
    scroll-behavior: smooth;
    box-sizing: border-box;
    align-items: center;
    justify-content: center;
    /* border: 3px solid yellow; */
}
.wrapper_list::-webkit-scrollbar{
    display: none;
}
.designer_list{
    display: flex;
    flex-direction: row;
    width: fit-content;
    height: min(25dvw,360px);
    /* width: min(64.444dvw, 928px); */
    /* width: auto; */
    /* height: min(24.722dvw,356px); */
    /* height: auto; */
    /* height: inherit; */
    /* margin-inline:min(2.222dvw,32px); */
    justify-content: left;
    align-items: center;
    gap: min(2.222dvw,32px);
    /* background-color: red; */
    /* overflow:auto; */
    /* overflow-y: hidden; */
} 
.designer{
    display: flex;
    /* width: min(20dvw, 288px); */
    width: fit-content;
    /* height:356px; */
    height: min(25dvw, 360px);
    /* height: 100%; */
    flex-direction: column;
    padding: min(1.389dvw,20px);
    /* margin:3px; */
    background-color: #f5f5f5;
    text-align: center;
    border-radius: min(0.556dvw, 8px);
    box-sizing: border-box;
    /* box-shadow: 0px 4px 40px 0px rgba(4, 6, 15, 0.08); */
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
    gap: min(1.111dvw, 16px);
}
.designer .user_img{
    width:min(6.944dvw,100px);
    height:min(6.944dvw,100px);
    margin:0px auto 0px auto;
    overflow:hidden;
    border-radius: 50%;
    /* background-color: rgb(167, 167, 167); */
}
.designer .user_img img{
    width:inherit;
    height:inherit;
    margin:auto;
}
.designer h3{
    width:100%;
    height: fit-content;
    /* margin-top:min(1.111dvw,16px) ; */
    font-size:min(1.25dvw,18px);
    color: #26AC34;
    overflow: hidden;
    text-overflow: ellipsis;
}
.designer div{
    width: min(17.222dvw, 248px);
    /* height: min(8.333dvw, 120px); */
    height: min(10.556dvw, 152px);
    /* height: auto; */
    overflow: hidden;
}
.designer div p{
    display: flex;
    width:inherit;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    font-size:  min(1.111dvw,16px);
    overflow: hidden;
    padding-top: min(0.278dvw, 4px);
    letter-spacing: min(0.014dvw, 0.2px);
    color: #212121;
}

.designer button{
    width: min(4.167dvw,60px);
    /* width: fit-content; */
    height: min(2.5dvw,36px);
    margin: 0px auto 0px auto;
    font-size: min(0.972dvw,14px);
    border: min(0.069dvw, 1px) solid;
    border-color: #E0E0E0;
    border-radius: min(0.278dvw, 4px);
    background-color: #FFFFFF;
    box-sizing: border-box;
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
    padding: min(0.556dvw, 8px) min(0.833dvw, 12px);
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}
.designer button:hover{
    color: #26AC34;
    background: #fff;
    border-color: #26AC34;
}

.scroll_button{
    width: fit-content;
    height: 100%;
    /* box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05); */
    /* position:absolute; */
    /* left:220px;
    top:40%; */
}
.scroll_button button{
    width: min(4.444dvw,64px);
    height: min(4.444dvw,64px);
    border: min(0.069dvw, 1px) solid;
    border-radius: 50%;
    background-color: inherit;
    border-color: #fff;
    cursor: pointer;
}
.scroll_button button:hover{
    border-color: #26AC34;
    background-color: #fff;
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
}
.scroll_button button svg{
    width: min(2.222dvw, 32px);
    height: min(2.222dvw, 32px);
}
.scroll_button svg:hover path{
    stroke: #26AC34;
}


@media (width <=744px){
    .wrapper_designer{
        height: min(53.226dvw,396px);
        padding: min(8.065dvw,60px) min(5.914dvw,44px);
        /* gap: clamp(1.111dvw,16px); */
    }
    .container_designer{
        gap: min(2.151dvw, 16px);
    }

    .wrapper_list{
        /* width: min(79.57dvw,592px); */
        height: min(37.097dvw,276px);
       
    }
    .designer_list{
        height: min(37.097dvw,276px);
        /* margin-inline:min(2.151dvw,16px); */
        gap: min(2.151dvw,16px);
    }
    .designer{
        width: min(23.656dvw,176px);
        height: min(36.022dvw,268px);
        padding:min(2.151dvw,16px);
        border-radius: min(1.075dvw, 8px);
        gap: min(1.613dvw, 12px);
    }
    .designer .user_img{
        width: min(10.753dvw,80px);
        height: min(10.753dvw,80px);
    }
    .designer h3{
        font-size: min(2.151dvw,16px);
        /* margin-top: min(1.613dvw,12px); */
    }
    .designer div{
        width: min(19.355, 144px);
        height: min(14.516dvw,108px);
    }
    .designer div p{
        -webkit-line-clamp: 4;
        font-size: min(1.882dvw,14px);
        padding-top: min(0.537dvw, 4px);
        letter-spacing: min(0.027dvw, 0.2px);
        color: #212121;
    }
    .designer button{
        /* width: min(7.392dvw,55px); */
        width: fit-content;
        height: min(3.226dvw,24px);
        font-size: min(1.613dvw,12px);
        margin-top: min(1.613dvw,12px);
        border: min(0.069dvw, 1px) solid;
        border-radius:  min(0.537dvw, 4px);
        border-color: #E0E0E0;
        color: #212121;
        padding: min(1.075dvw, 8px) min(1.613dvw, 12px);
    /* margin: 0px auto 0px auto; */
    /* font-size: min(0.972dvw,14px); */
    }
    /* .scroll_button{
        width: min(4.301dvw,32px);
        height: min(4.301dvw,32px);
    } */
    .scroll_button button{
        width: min(4.301dvw, 32px);
        height: min(4.301dvw, 32px);
        border: min(0.134dvw, 1px) solid;
        background-color: inherit;
        border-color: #fff;
    }
    .scroll_button button svg{
        width: min(2.151dvw,16px);
        height: min(2.151dvw,16px);
    }
    .scroll_button img{
        width: min(2.151dvw,16px);
        height: min(2.151dvw,16px);
    }
}

@media (width<=376px){
    .wrapper_designer{
        height: min(69.149dvw, 260px);
        padding: min(7.447dvw,28px) min(4.255dvw,16px);
    }
    .wrapper_list{
        /* width: min(93.617dvw,352px); */
        height: min(54.255dvw,204px);
    }
    .designer_list{
        height: min(54.255dvw,204px);
        /* margin-inline:(2.128dvw,8px); */
        gap:min(2.128dvw,8px);
    }
    .designer{
        width:min(44.681dvw, 168px);
        height: min(54.255dvw,204px);
        padding: min(2.128dvw, 8px);
        border-radius: min(1.064dvw, 4px);
        gap: min(2.128dvw, 8px);
    }
    .designer .user_img{
        width: min(15.957dvw, 60px);
        height: min(15.957dvw, 60px);
    }
    .designer h3{
        font-size: min(3.191dvw,12px);
        /* margin-top: min(2.128dvw,8px); */
    }
    .designer div{
        width: min(40.426dvw, 152px);
        height: min(21.277dvw, 80px);
    }
    .designer div p{
        -webkit-line-clamp: 3;
        font-size: min(3.191dvw,12px);
        padding-top: min(1.064dvw, 4px);
        letter-spacing: min(0.053dvw, 0.2px);
        color: #212121;
    }
    .designer button{
        /* width: min(14.628dvw,55px); */
        width: fit-content;
        height: min(6.383dvw,24px);
        font-size: min(3.191dvw,12px);
        margin-top: min(2.128dvw,8px);
        border: min(0.266dvw, 1px) solid;
        border-radius:  min(1.064dvw, 4px);
        border-color: #E0E0E0;
        color: #212121;
        padding: min(1.064dvw, 4px) min(2.128dvw, 8px);
    }
    .scroll_button{
        display: none;
    }
}   

</style>