<script setup>
import {ref} from 'vue'
let origin = `${import.meta.env.VITE_BASE_URL}`;
const props=defineProps({
    name:{
        type:String,
        required:true,
        default:''
    },
    projectImg:{
        type:String,
        default:''
    },
    projectName:{
        type:String,
        default:''
    },
    createrImg:{
        type:String,
        default:''
    },
    createrName:{
        type:String,
        default:''
    },
    likeCount:{
        type:Number,
        default:0
    },
    commentCount:{
        type:Number,
        default:0
    },
    createAt:{
        type:String,
        default:''
    },
    size:{
        type:Number,
        default:100
    }
})
</script>
<template>
    <div class="gallery_item">
        <!-- img -->
        <div class="gallery_item_img">
            <!-- <img v-if="props.projectImg!=undefined" :src="`${origin}/api/image/users/${props.projectImg}`" alt="gallery_img"> -->
            <img  src="../../assets/vue.svg" alt="gallery_img">
        </div>
        <!-- cart detail -->
        <div class="container_gallery_card_detail">
            <!-- info -->
            <div class="gallery_card_detail">
                <!-- project name -->
                <h5>
                    {{ props.projectName }}
                </h5>
                <!-- creater -->
                <div class="container_creater">
                    <!-- img -->
                    <div>   
                        <!-- <img v-if="props.createrImg!=undefined" :src="`${origin}/api/image/gallery/${props.createrImg}`" alt="creater_name"> -->
                        <img src="../../assets/vue.svg" alt="creater_name">
                    </div>
                    <!--  name -->
                    <h6>
                        {{props.createrName}}
                    </h6>
                </div>
            </div>
            <!-- project like -->
            <div class="project_detail">
                <!-- like -->
                <div>
                    <div>
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M6.92501 0.25008C7.24051 0.25008 7.55551 0.29458 7.85501 0.39508C9.70051 0.99508 10.3655 3.02008 9.81001 4.79008C9.49501 5.69458 8.98001 6.52008 8.30551 7.19458C7.34001 8.12958 6.28051 8.95958 5.14001 9.67458L5.01501 9.75008L4.88501 9.66958C3.74051 8.95958 2.67501 8.12958 1.70051 7.18958C1.03051 6.51508 0.515008 5.69458 0.195008 4.79008C-0.369992 3.02008 0.295008 0.99508 2.16051 0.38458C2.30551 0.33458 2.45501 0.29958 2.60501 0.28008H2.66501C2.80551 0.25958 2.94501 0.25008 3.08501 0.25008H3.14001C3.45501 0.25958 3.76001 0.31458 4.05551 0.41508H4.08501C4.10501 0.42458 4.12001 0.43508 4.13001 0.44458C4.24051 0.48008 4.34501 0.52008 4.44501 0.57508L4.63501 0.66008C4.68092 0.684566 4.73245 0.72198 4.77699 0.754315C4.80521 0.774802 4.83062 0.79325 4.85001 0.80508C4.85817 0.809894 4.86646 0.814734 4.87482 0.819614C4.91769 0.84464 4.96235 0.87071 5.00001 0.89958C5.55551 0.47508 6.23001 0.24508 6.92501 0.25008ZM8.25501 3.85008C8.46001 3.84458 8.63501 3.68008 8.65001 3.46958V3.41008C8.66501 2.70958 8.24051 2.07508 7.59501 1.83008C7.39001 1.75958 7.16501 1.87008 7.09001 2.08008C7.02001 2.29008 7.13001 2.52008 7.34001 2.59458C7.66051 2.71458 7.87501 3.03008 7.87501 3.37958V3.39508C7.86551 3.50958 7.90001 3.62008 7.97001 3.70508C8.04001 3.79008 8.14501 3.83958 8.25501 3.85008Z" fill="#BDBDBD"/>
                        </svg>
                    </div>
                    <h6>
                        {{props.likeCount}}
                    </h6>
                </div>
                <!-- comment -->
                <div>
                    <div>
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0 5.00751C0 2.37356 2.105 0 5.01 0C7.85 0 10 2.32849 10 4.99249C10 8.08212 7.48 10 5 10C4.18 10 3.27 9.77967 2.54 9.34902C2.285 9.19379 2.07 9.07862 1.795 9.16875L0.785 9.4692C0.53 9.54932 0.3 9.34902 0.375 9.07862L0.71 7.95694C0.765 7.8017 0.755 7.63645 0.675 7.50626C0.245 6.71507 0 5.84877 0 5.00751ZM4.35 5.00751C4.35 5.36304 4.635 5.64847 4.99 5.65348C5.345 5.65348 5.63 5.36304 5.63 5.01252C5.63 4.65699 5.345 4.37156 4.99 4.37156C4.64 4.36655 4.35 4.65699 4.35 5.00751ZM6.655 5.01252C6.655 5.36304 6.94 5.65348 7.295 5.65348C7.65 5.65348 7.935 5.36304 7.935 5.01252C7.935 4.65699 7.65 4.37156 7.295 4.37156C6.94 4.37156 6.655 4.65699 6.655 5.01252ZM2.685 5.65348C2.335 5.65348 2.045 5.36304 2.045 5.01252C2.045 4.65699 2.33 4.37156 2.685 4.37156C3.04 4.37156 3.325 4.65699 3.325 5.01252C3.325 5.36304 3.04 5.64847 2.685 5.65348Z" fill="#BDBDBD"/>
                        </svg>
                    </div>
                    <h6>
                        {{props.commentCount}}
                    </h6>
                </div>
                <!-- create at -->
                <div>
                    <div>
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M5 10C2.24 10 0 7.765 0 5C0 2.24 2.24 0 5 0C7.765 0 10 2.24 10 5C10 7.765 7.765 10 5 10ZM6.595 6.855C6.655 6.89 6.72 6.91 6.79 6.91C6.915 6.91 7.04 6.845 7.11 6.725C7.215 6.55 7.16 6.32 6.98 6.21L5.2 5.15V2.84C5.2 2.63 5.03 2.465 4.825 2.465C4.62 2.465 4.45 2.63 4.45 2.84V5.365C4.45 5.495 4.52 5.615 4.635 5.685L6.595 6.855Z" fill="#BDBDBD"/>
                        </svg>
                    </div>
                    <h6>
                        {{props.createAt}}
                    </h6>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
*{
    box-sizing: border-box;
}
.gallery_item{
    display: flex;
    width: 256px;
    height: 368px;
    border: none;
    border-radius: 8px;
    box-shadow: 0px 1px 2px 0px #0000000F;
    overflow: hidden;
    background-color: #fff;
    flex-direction: column;
    cursor: pointer;
}
.gallery_item:hover{
    border: 1px solid #26AC34;
}
.gallery_item .gallery_item_img{
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}
.gallery_item_img img{
    width: 100%;
    height: auto;
    /* z-index: ; */
}
.container_gallery_card_detail{
    display: flex;
    width: 100%;
    height: 148px;
    flex-direction:column;
}
/* detail */
.gallery_card_detail{
    display: flex;
    width: 100%;
    height: 108px;
    flex-direction: column;
    gap: 12px;
    justify-content: center;
    align-items: center;
    /* padding: 12px; */
}
.gallery_card_detail h5{
    display: -webkit-box;
    width: 232px;
    height: fit-content;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-size:  16px;
    font-weight: 500;
    overflow: hidden;
    /* padding-top: min(0.278dvw, 4px); */
    /* letter-spacing: min(0.014dvw, 0.2px); */
    color: #212121;
}
.gallery_card_detail .container_creater{
    display: flex;
    width: 232px;
    height: 24px;
    gap: 4px;
    align-items: center;
}
.container_creater >div{
    display: flex;
    width: 24px;
    height: 24px;
    overflow: hidden;
    justify-content: center;
    align-items: center;
}
.container_creater >div img{
    width: 100%;
    height: auto;
}
.container_creater  h6{
    width: 100%;
    height: fit-content;
    white-space: nowrap;
    font-size: 12px;
    font-weight: 400;
    color:#757575;
    text-decoration: underline;
    overflow: hidden;
    text-overflow: ellipsis;
}
/* project detail */
.project_detail{
    display: flex;
    width: 100%;
    height: 40px;
    border-top:1px solid #EEEEEE;
    padding: 12px;
    gap: 8px;
}
.project_detail >div{
    display: flex;
    width: 100%;
    height: 100%;
    gap: 4px;
    align-items: center;
    justify-content: start;
}
/* svg */
.project_detail >div>div{
    display: flex;
    width: 12px;
    height: 12px;
    justify-content: center;
    align-items: center;
}
.project_detail >div>div svg{
    width: 10;
    height: auto;
}
/* text */
.project_detail >div h6{
    width: 100%;
    height: fit-content;
    font-size: 12px;
    font-weight: 400;
    color: #757575;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>