<script setup>

</script>
<template>
    <div class="wrapper_content">
        <h3>
            LANDSCAPE DESIGN STYLE
        </h3>
        <div class="container_content">
            <div class="content_item">
                <img src="../../assets/home_p/home_design_content_modern.png" alt="modern_style_img">
                <h4>
                    Modern Style
                </h4>
            </div>
            <div class="content_item">
                <img src="../../assets/home_p/home_design_content_tropical.png" alt="tropical_style_img">
                <h4>
                    Tropical Style
                </h4>
            </div>  
            <div class="content_item">
                <img src="../../assets/home_p/home_design_content_japanese.png" alt="japanese_style_img">
                <h4>
                    Japanese Style
                </h4>
            </div> 
            <div class="content_item">
                <img src="../../assets/home_p/home_design_content_english.png" alt="english_style_img">
                <h4>
                    English Style
                </h4>
            </div>     
            <div class="content_item">
                <img src="../../assets/home_p/home_design_content_europe.png" alt="europe_style_img">
                <h4>
                    Europe Style
                </h4>
            </div> 
            <div class="content_item">
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
    width: auto;
    /* height: 896px; */
    height: auto;
    /* min-width: 896px; */
    justify-content: center;
    /* align-items: center; */
    box-sizing: border-box;
    padding: 40px 160px;
}
.wrapper_content h3{
    width: auto;
    height: 60px;
    font-size: 24px;
    text-align: center;
    /* margin: 0px auto 0px auto; */
    padding: 12px 0px;
    box-sizing: border-box;
}
.container_content{
    display: grid;
    text-align: center;
    grid-template-columns:1fr 1fr 1fr;
    gap: 30px;
    justify-content: center;
    /* overflow: hidden; */
    margin-top: 20px;
}
.content_item{
    display: flex;
    /* width: 352px;
    height: 352px; */
    flex-direction: column;
    justify-content: center;
    /* overflow: hidden; */
    
    width: fit-content;
    height: fit-content;
    
}
.content_item img{
    /* width: 352px;
    height:300px; */
    border-radius:10px ;
    /* background-color: gray; */
    width: 100%;
    height: auto;
}
.content_item h4{
    width: auto;
    height: 52px;
    text-transform: capitalize;
    font-weight: 700;
    font-size: 18px;
    padding: 12px 0px;
}

@media (width <=744px){
    .wrapper_content{
        width: inherit;
        height: auto;
        padding: 20px 44px;
    }
    .container_content{
        grid-template-columns: 1fr 1fr;
        gap: 16px;
    }
    .wrapper_content h3{
        height: 48px;
        padding: 8px 0px;
        font-size: 20px;
    }
    .content_item{
        /* width: 320px;
        height: 280px; */
        width: fit-content;
        height: fit-content;
    }
    .content_item img{
        width: 100%;
        height: auto;
        /* max-width: 50%; */
    }
    .content_item h4{
        height: 40px;
        font-size: 16px;
        padding: 8px 0px;
    }
}

@media (width <=376px){
    .wrapper_content{
        height: auto;
        padding: 20px 44px;
    }
    .container_content{
        gap: 8px;
    }
    .wrapper_content h3{
        height: 28px;
        font-size: 14px;
        padding: 4px 0px;
    }
    .content_item{
        /* width: 168px;
        height: 152px; */
        width: fit-content;
        height: fit-content;
    }
    .content_item img{
        /* height: 128px; */
        width: 100%;
        height: auto;
    }
    .content_item h4{
        height: 24px;
        padding: 4px 0px;
        font-size: 12px;
    }
}
</style>