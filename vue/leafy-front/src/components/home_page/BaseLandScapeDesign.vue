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
    height: 896px;
    justify-content: center;
    /* align-items: center; */
    box-sizing: border-box;
}
.wrapper_content h3{
    width: 1120px;
    height: 36px;
    font-size: 24px;
    text-align: center;
    margin: 0px auto 0px auto;
    padding: 12px 0px;
}
.container_content{
    display: grid;
    text-align: center;
    grid-template-columns: auto auto auto;
    grid-row-start: 1;
    grid-row-end: 3;
    gap: 30px;
    justify-content: center;
    overflow: hidden;
    margin-top: 20px;
}
.content_item{
    display: flex;
    width: 352px;
    height: 352px;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;

    
}
.content_item img{
    width: 352px;
    height:300px;
    border-radius:10px ;
    /* background-color: gray; */
}
.content_item h4{
    text-transform: capitalize;
    font-weight: 700;
    font-size: 18px;

}
</style>