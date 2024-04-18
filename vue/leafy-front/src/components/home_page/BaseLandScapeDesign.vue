<script setup>
import {useRouter} from 'vue-router'
const myRouter = useRouter()
const goGallery =(search="")=>myRouter.push({name:"Gallery",params:{search:search}})
</script>
<template>
    <div class="wrapper_content">
        <h3>
            LANDSCAPE DESIGN STYLE
        </h3>
        <div class="container_content">
            <div @click="goGallery('modern')" class="content_item">
                <img src="../../assets/home_p/home_design_content_modern.png" alt="modern_style_img">
                <h4>
                    Modern Style
                </h4>
            </div>
            <div @click="goGallery('tropical')" class="content_item">
                <img src="../../assets/home_p/home_design_content_tropical.png" alt="tropical_style_img">
                <h4>
                    Tropical Style
                </h4>
            </div>  
            <div @click="goGallery('japanese')" class="content_item">
                <img src="../../assets/home_p/home_design_content_japanese.png" alt="japanese_style_img">
                <h4>
                    Japanese Style
                </h4>
            </div> 
            <div @click="goGallery('english')" class="content_item">
                <img src="../../assets/home_p/home_design_content_english.png" alt="english_style_img">
                <h4>
                    English Style
                </h4>
            </div>     
            <div @click="goGallery('europe')" class="content_item">
                <img src="../../assets/home_p/home_design_content_europe.png" alt="europe_style_img">
                <h4>
                    Europe Style
                </h4>
            </div> 
            <div @click="goGallery('desert')" class="content_item">
                <img src="../../assets/home_p/home_design_content_desert.png" alt="desert_style_img">
                <h4>
                    Desert Style
                </h4>
            </div> 
                   
        </div>

    </div>
</template>
<style scoped>
.wrapper_content{
    display: flex;
    flex-direction: column;
    width: 100%;
    /* height: 688px; */
    height: fit-content;
    justify-content: center;
    box-sizing: border-box;
    padding: min(2.778dvw, 40px) min(11.111dvw, 160px);
    align-items: center;
    gap: min(1.389dvw, 20px);
    align-items: center;
}
.wrapper_content h3{
    display: flex;
    justify-content: center;
    align-items: center;
    /* width: min(77.778dvw, 1120px); */
    width: auto;
    /* height:  min(4.167dvw, 60px); */
    height: fit-content;
    font-size:  min(1.667dvw, 24px);
    text-align: center;
    /* margin: 0px auto 0px auto; */
    padding-bottom: min(0.833dvw, 12px);
    text-transform: capitalize;
    box-sizing: border-box;
    border-bottom: min(0.069dvw, 1px) solid #E0E0E0;
    /* display: flex; */
    color:#252525;
    align-self: stretch;
}
.container_content{
    display: grid;
    text-align: center;
    grid-template-columns: 1fr 1fr 1fr;
    gap: min(2.222dvw, 32px);
    justify-content: center;
    /* overflow: hidden; */
    /* margin-top: min(1.389dvw, 20px); */
    /* height: min(49.444dvw, 712px); */
    height: fit-content;
    /* width: min(77.778dvw, 1120px); */
    width: 100%;
    flex-direction: row;
    align-items: center;
}
.content_item {
    display: flex;
    /* width: min(24.444dvw, 352px); */
    width: auto;
    /* height: min(23.611dvw, 340px);  */
    /* width: 100%; */
    flex-direction: column;
    justify-content: center;
    /* overflow: hidden; */
    /* width: fit-content; */
    height: fit-content;
    cursor: pointer;
    gap: min(0.833dvw, 12px);
}
.content_item img{
    /* width: min(24.444dvw, 352px); */
    width: 100%;
    height: min(20.833dvw, 330px);
    border-radius: min(0.556dvw, 8px);
    /* background-color: gray; */
}
.content_item h4{
    text-transform: capitalize;
    font-weight: 700;
    font-size: min(1.25dvw, 18px);
    display: flex;
    flex-direction: column;
    align-items: center;
    align-self: stretch;
    color: #212121;
}
.content_item:hover h4 {
    color: #26AC34;
}

@media (width <=744px){
    .wrapper_content{
        width: inherit;
        height: auto;
        padding: min(2.688dvw, 20px) min(5.914dvw, 44px);
        gap: min(2.151dvw, 16px);
    }
    .container_content{
        grid-template-columns: auto auto;
        /* width: min(88.172, 656px); */
        width: auto;
        gap: min(2.151dvw, 16px);
    }
    .wrapper_content h3{
        /* height: 48px; */
        padding: min(1.075dvw, 8px) 0px;
        font-size: min(2.688dvw, 20px);
        letter-spacing: min(0.032dvw, 0.24px);
    }
    .content_item{
        /* width: 320px;
        height: 280px; */
        /* width: fit-content;
        height: fit-content; */
        gap: min(1.075dvw, 8px);
    }
    .content_item img{
        width: min(43.011dvw, 320px);
        height: min(32.258dvw, 240px);
        border-radius: min(1.075dvw, 8px);
        /* max-width: 50%; */
    }
    .content_item h4{
        /* height: 40px; */
        font-size: min(2.151dvw, 16px);
        letter-spacing: min(0.027dvw, 0.2px);
        /* padding: 8px 0px; */
    }
}

@media (width <=432px){
    .wrapper_content{
        padding: min(5.556dvw,24px) min(4.63dvw,20px) min(6.481dvw,28px) min(4.63dvw,20px);
        gap: min(1.852dvw,8px);
    }
    .container_content{
        gap: min(1.852dvw,8px);
    }
    .wrapper_content h3{
        font-size: min(3.241dvw, 14px);
        padding: min(0.926dvw,4px) 0px;
        letter-spacing: min(0.046dvw, 0.2px);
    }
    .content_item{
        gap: min(0.926dvw,4px);
    }
    .content_item img{
        width: min(44.444dvw, 192px);
        height: min(33.333dvw, 144px);
        border-radius: min(0.926dvw,4px);
    }
    .content_item h4{
        font-size: min(2.778dvw,12px);
        letter-spacing: min(0.046dvw, 0.2px);
    }
}

/* @media (width <=376px){
    .wrapper_content{
        padding: min(6.383dvw, 24px) min(4.255dvw, 16px) min(7.713dvw, 28px) min(4.255dvw, 16px);
        gap: min(2.128dvw, 8px);
    }
    .container_content{
        gap: min(2.128dvw, 8px);
    }
    .wrapper_content h3{
        font-size: min(3.723dvw, 14px);
        padding: min(1.064dvw, 4px) 0px;
        letter-spacing: min(0.053dvw, 0.2px);
    }
    .content_item{
        gap: min(1.064dvw, 4px);
    }
    .content_item img{
        width: min(44.681dvw, 168px);
        height: min(34.043dvw, 128px);
        border-radius: min(1.064dvw, 4px);
    }
    .content_item h4{
        font-size: min(3.191dvw, 12px);
        letter-spacing: min(0.053dvw, 0.2px);
    }
} */
</style>