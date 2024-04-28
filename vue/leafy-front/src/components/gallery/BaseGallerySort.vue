<script setup>
import {ref,onMounted} from 'vue'
const emit=defineEmits(["getStyleFilter","nextPage","previousPage"])
const props =defineProps({
    name:{
        type:String,
        required:true,
        default:''
    },
    isSetting:{
        type:Boolean,
        default:false
    },
    currentPage:{
        type:Number,
        default:1
    },
    allPage:{
        type:Number,
        default:1
    }
})
// common attribute
const showStyleFilter=ref(false)

// choose style
const selectFilter=(name,styleFilter,isStyle=false)=>{
        let element=document.getElementById(name)
        let allElement=document.getElementsByClassName("sort_btn")
        // clear first
        for(let element of allElement){
            element.classList.remove('sort_btn_active')
        }
        element.classList.add('sort_btn_active')
        showStyleFilter.value=false
        // console.log(styleFilter)
    if(styleFilter!=undefined){
        if(isStyle){
            return emit("getStyleFilter",{style:styleFilter})
        }else{
            return emit("getStyleFilter",{sort_name:styleFilter})
        }
    }
}

// move page
const nextPage=()=>{
    let currentPageNow=(props.currentPage+1)>props.allPage?props.allPage:props.currentPage+1
    return emit('nextPage',currentPageNow)
}
const previousPage=()=>{
    let currentPageNow=(props.currentPage-1)<=0?props.currentPage:props.currentPage-1
    return emit('previousPage',currentPageNow)
}

onMounted(()=>{
    // selectFilter('all_design','all')
    selectFilter('all_design')
})
</script>
<template>
    <!-- sort  -->
    <div class="gallery_sort" :id="props.name">
        <!-- button list -->
        <div class="container_sort">
            <button @click="selectFilter('all_design','all')" id="all_design" class="sort_btn">
                All Design
            </button>
            <button @click="selectFilter('lastes','lastest')" id="lastes" class="sort_btn">
                Latest
            </button>
            <!-- <button>
                All Design
            </button> -->
            <!-- <div class="style_sort"> -->
            
            <!-- drop down -->
            <div class="container_drop_down">
                <button @click="showStyleFilter=!showStyleFilter" id="style" class="sort_btn">
                    Style
                    <div>
                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.292433 0.304675C0.479735 0.117581 0.733736 0.0124767 0.998581 0.0124767C1.26342 0.0124767 1.51743 0.117581 1.70473 0.304675L4.99376 3.59106L8.28278 0.304675C8.37492 0.209357 8.48513 0.133328 8.60699 0.0810238C8.72885 0.0287201 8.85991 0.00118918 8.99253 3.76812e-05C9.12515 -0.00111382 9.25667 0.0241369 9.37941 0.0743168C9.50216 0.124497 9.61368 0.198601 9.70746 0.292305C9.80124 0.386009 9.8754 0.497437 9.92562 0.620086C9.97584 0.742736 10.0011 0.874151 9.99996 1.00666C9.99881 1.13918 9.97126 1.27013 9.91891 1.39189C9.86656 1.51365 9.79047 1.62377 9.69508 1.71583L5.6999 5.7078C5.5126 5.8949 5.2586 6 4.99376 6C4.72891 6 4.47491 5.8949 4.28761 5.7078L0.292433 1.71583C0.105189 1.52868 0 1.27489 0 1.01026C0 0.745624 0.105189 0.491826 0.292433 0.304675Z" fill="#212121"/>
                        </svg>
                    </div>
                </button>
                <div v-show="showStyleFilter" class="drop_down_sort">
                    <button @click="selectFilter('style','modern','style')" class="style_sort">
                        Modern
                    </button>
                    <button @click="selectFilter('style','tropical',true)" class="style_sort">
                        Tropical
                    </button>
                    <button @click="selectFilter('style','japanese',true)" class="style_sort">
                        Japanese
                    </button>
                    <button @click="selectFilter('style','english',true)" class="style_sort">
                        English
                    </button>
                    <button @click="selectFilter('style','europe',true)" class="style_sort">
                        Europe
                    </button>
                    <button @click="selectFilter('style','desert',true)" class="style_sort">
                        Desert
                    </button>
                    <button @click="selectFilter('style','other',true)" class="style_sort">
                        Other
                    </button>
                </div>
            </div>
            <!-- </div> -->
        </div>
        <!-- move page -->
        <div v-if="!props.isSetting" class="container_move">
            <!-- show all page -->
            <h5>
                <span>
                    {{props.currentPage==0?1:props.currentPage}}
                </span>
                /{{props.allPage==0?1:props.allPage}}
            </h5>
            <div>
                <button @click="previousPage">
                    <div>
                        <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.70679 0.292787C5.89426 0.480314 5.99957 0.734622 5.99957 0.999786C5.99957 1.26495 5.89426 1.51926 5.70679 1.70679L2.41379 4.99979L5.70679 8.29279C5.88894 8.48139 5.98974 8.73399 5.98746 8.99619C5.98518 9.25838 5.88001 9.5092 5.6946 9.6946C5.5092 9.88001 5.25838 9.98518 4.99619 9.98746C4.73399 9.98974 4.48139 9.88894 4.29279 9.70679L0.292787 5.70679C0.105316 5.51926 0 5.26495 0 4.99979C0 4.73462 0.105316 4.48031 0.292787 4.29279L4.29279 0.292787C4.48031 0.105316 4.73462 0 4.99979 0C5.26495 0 5.51926 0.105316 5.70679 0.292787Z" fill="#424242"/>
                        </svg>
                    </div>
                </button>
                <button @click="nextPage">
                    <div>
                        <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.292787 9.70741C0.105316 9.51988 0 9.26557 0 9.00041C0 8.73524 0.105316 8.48094 0.292787 8.29341L3.58579 5.00041L0.292787 1.70741C0.110629 1.5188 0.00983372 1.2662 0.0121121 1.00401C0.0143906 0.741809 0.11956 0.490997 0.304968 0.305589C0.490376 0.120181 0.741189 0.0150115 1.00339 0.0127331C1.26558 0.0104547 1.51818 0.111249 1.70679 0.293408L5.70679 4.29341C5.89426 4.48094 5.99957 4.73524 5.99957 5.00041C5.99957 5.26557 5.89426 5.51988 5.70679 5.70741L1.70679 9.70741C1.51926 9.89488 1.26495 10.0002 0.999786 10.0002C0.734622 10.0002 0.480314 9.89488 0.292787 9.70741Z" fill="#424242"/>
                        </svg>
                    </div>
                </button>
            </div>
        </div>
    </div>
</template>
<style scoped>
*{
    box-sizing: border-box;
}
/* active button */
.sort_btn_active{
    background-color: #26AC34 !important;
    color: #fff !important;
}
.sort_btn_active svg path{
    fill:#fff !important;
}
.gallery_sort{
    display: flex;
    width: 100%;
    height: v-bind('props.isSetting==true?'36px':'min(5.278dvw,76px)'');
    
    /* height: fit-content; */
    border-radius: min(1.075dvw,8px);
    color: #EEEEEE;
    /* overflow: hidden; */
    align-items: center;
    justify-content: space-between;
    background-color: v-bind('props.isSetting==true?'':'#EEEEEE'');
    padding: v-bind('props.isSetting==true?'0px':'min(1.389dvw,20px)'');
}
.sort_btn {
    font-size: min(0.972dvw,14px);
    line-height: 144%;
}
.container_sort{
    display: flex;
    width: 100%;
    height: fit-content;
    gap: min(0.833dvw,12px);
    justify-content: start;
    align-items: center;
}
.container_sort button{
    display: flex;
    width: fit-content;
    height: min(2.5dvw,36px);
    justify-content: center;
    align-items: center;
    border: none;
    box-shadow: 0px min(0.069dvw,1px) min(0.139dvw,2px) 0px #0000000D;
    border-radius: min(0.278dvw,4px);
    padding: min(1.075dvw,8px) min(0.833dvw,12px);
    background-color: #fff;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    gap: min(1.075dvw,8px);
}
.container_sort> button{
    border: v-bind('props.isSetting==true?'1px solid #E0E0E0':'none'');
}
.container_sort button >div{
    display: flex;
    width: min(1.389dvw,20px);
    height: min(1.389dvw,20px);
    justify-content: center;
    
}
.container_sort button >div svg{
    width: min(0.694dvw,10px);
    height: auto;
}
.container_sort button:hover{
    background-color: #26AC34;
    color: #fff;
}
.container_sort button:hover svg path{
    fill:#fff
}
/* drop down sort */
.container_sort .container_drop_down{
    position: relative;
}
.container_sort .container_drop_down >button{
    border: v-bind('props.isSetting==true?'1px solid #E0E0E0':'none'');
}
.container_sort .drop_down_sort{
    display: flex;
    position: absolute;
    width: min(9.722dvw,140px);
    height: fit-content;
    background-color: #fff;
    color: #212121;
    /* bottom: min(19.444dvw,-280px); */
    top: min(2.5dvw,7dvw);
    right: 0px;
    border: min(0.069dvw,1px) solid #E0E0E0;
    border-radius: min(0.278dvw,4px);
    padding: min(0.556dvw,8px) 0px;
    box-shadow: 0px min(0.278dvw,4px) min(0.417dvw,6px) min(0.139dvw,-2px) #0000000D;
    justify-content: center;
    align-items: start;
    flex-direction: column;
    z-index: 99;
    /* cursor: pointer; */
    /* gap */
}
.drop_down_sort .style_sort{
    display: flex;
    width: 100%;
    height: fit-content;
    cursor: pointer;
    border-radius: 0px;
    box-shadow: none;
    font-weight: 400;
    font-size: min(0.972dvw,14px);
    line-height: 144%;
    letter-spacing: min(0.014dvw,0.2px);
    color: #212121;
    white-space: nowrap;
}
.drop_down_sort .style_sort:hover{
    background-color: #26AC34;
    color: #fff;
}

/* move page */
.container_move{
    display: flex;
    width: fit-content;
    height: fit-content;
    gap: min(1.389dvw,20px);
    justify-content: center;
    align-items: center;
}
.container_move h5{
    display: flex;
    width: fit-content;
    height: fit-content;
    color:#212121;
    font-size: min(0.972dvw,14px);
    font-weight: 500;
}
.container_move h5 span{
    color: #26AC34;
}
.container_move >div{
    display: flex;
    width: fit-content;
    height: 100%;
    gap: min(0.278dvw,4px);
    justify-content: center;
    align-items: center;
}
.container_move >div button{
    display: flex;
    width: min(3.056dvw,44px);
    height: min(2.5dvw,36px);
    border: none;
    border-radius: min(0.278dvw,4px);
    padding: min(0.556dvw,8px) min(0.833dvw,12px);
    background-color: #fff;
    cursor: pointer;
    justify-content: center;
    align-items: center;
}
.container_move >div button div{
    display: flex;
    width: min(1.389dvw,20px);
    height: min(1.389dvw,20px);
    justify-content: center;
    align-items: center
}
.container_move >div button div svg{
    width: min(0.417dvw,6px);
    height: auto;
}
.container_move >div button:hover {
    background-color: #26AC34;
}
.container_move >div button:hover svg path {
    fill: #FFF;
}

/* mobile */
@media (width<=432px){
    .gallery_sort{
        height: v-bind('props.isSetting==true?'min(8.333dvw,36px)':'fit-content'');
        border-radius: 0px;
        background-color:transparent;
        padding: min(4.63dvw,20px);
    }
    .sort_btn {
        font-size: min(3.241dvw,14px);
    }
    .container_sort{
        gap: 0px;
        justify-content: space-around;
    }
    .container_sort button{
        width: min(20.833dvw,90px);
        height: min(8.333dvw,36px);
        box-shadow: 0px 1px 2px 0px #0000000D;
        border-radius: min(0.926dvw,4px);
        padding: min(1.852dvw,8px) min(2.778dvw,12px);
        gap: min(1.852dvw,8px);
    }
    .container_sort button >div{
        width: min(4.63dvw,20px);
        height: min(4.63dvw,20px);
    }
    .container_sort button >div svg{
        width: min(2.315dvw,10px);
        height: auto;
    }
    .container_sort .drop_down_sort{
        display: flex;
        position: absolute;
        width: min(27.778dvw,120px);
        height: fit-content;
        background-color: #fff;
        color: #212121;
        /* bottom: min(19.444dvw,-280px); */
        top: min(9.259dvw,40px);
        right: 0px;
        border: min(0.231dvw,1px) solid #E0E0E0;
        border-radius: min(0.926dvw,4px);
        padding: min(1.852dvw,8px) 0px;
        box-shadow: 0px 4px 6px -2px #0000000D;
    }
    .drop_down_sort .style_sort{
        font-size: min(3.241dvw,14px);
        padding: min(1.852dvw,8px);
    }
    .container_move{
        display: none;
    }
}
</style>