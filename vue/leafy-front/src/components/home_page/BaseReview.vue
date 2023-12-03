<script setup>
import{ref,computed} from 'vue'
import js from '../../JS/validation'
const starAverage=ref(4.8)
const starAmount=ref(Math.floor(starAverage.value))
const reviewAmount=ref(1001)

const calculateReview=computed(()=>{
    // console.log(reviewAmount.value)
    const value=reviewAmount.value.toString()
    let returnData=undefined
    if(value.length>4){
       returnData=value.substring(0,value.length-3)+'K'
        
    }else return value
    
    return returnData
    // reviewAmount.value>1000?reviewAmount.substring()
})

const reviewArr=ref([
    {name:"Zeed Paap",starAmount:3,comment:"Good website",time:''},
    {name:"Ramato Ei",starAmount:5,comment:"I like this!!",time:''},
    {name:"Ramato Ei",starAmount:5,comment:"I like this!!",time:''},
    {name:"Ramato Ei",starAmount:5,comment:"I like this!!",time:''},
    {name:"Ramato Ei",starAmount:5,comment:"I like this!!",time:''},
    {name:"Ramato Eidfgdfgdfg",starAmount:5,comment:"I like this!!",time:''}
])
</script>
<template>
    <div class="wrapper">
        <div class="container_review">
            <div class="overall_review">
                <h3>
                    EXCELLENT
                </h3>
                <div class="star_review">
                    <img v-for="(star,index) of starAmount>5?5:starAmount" :key="index" src="../../assets/icon/star.svg" alt="star_icon">
                </div>
                <h4>
                    {{ starAverage }} average
                </h4>
                <h4>
                    {{ calculateReview }} reviews
                </h4>
            </div>

            <div @click="js.scroll('previous','.wrapper_review')" class="review_slide">
                <img src="../../assets/icon/left_arrow.svg" alt="previous">
            </div>
            <div class="wrapper_review">
                <div class="review_list">
                    <div v-for="(data,indexArr) of reviewArr" :key="indexArr" class="review">
                        <div class="personal_info">
                            <h4>
                            {{ data.name }}                            
                            </h4>
                            <div>
                                <img v-for="(star,index) of data.starAmount>5?5:data.starAmount" :key="index" src="../../assets/icon/star.svg" alt="star_icon">
                            </div>
                        </div>

                        <div class="comment">
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt maiores perferendis, debitis sequi recusandae nisi enim expedita rerum voluptatem quis dignissimos, harum maxime? Sint cupiditate dolore eos est quas quae.
                            </p>
                        </div>
                        <div class="date">
                            5 day ago
                        </div>
                    </div>
                </div>
            </div>
            <div @click="js.scroll('next','.wrapper_review')" class="review_slide">
                <img src="../../assets/icon/right_arrow.svg" alt="next">
            </div>
            
        </div>

        
    </div>
</template>
<style scoped>
.wrapper{
    display: flex;
    width: auto;
    height: 364px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.container_review{
    display: flex;
}
.overall_review{
    display: flex;
    width: 200px;
    height:244px;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    
    
}
.overall_review h3{
    
    font-size: 18px;
    text-transform: uppercase;
}
.overall_review h4{
    margin-top: 5px;
    font-size: 14px;
}
.star_review{
    margin-top: 5px;
}
.star_review img{
    width: 20px;
    height: 20px;
}

.wrapper_review{
    /* display: flex; */
    width:700px;
    height:244px;
    overflow: auto;
    
}
.wrapper_review::-webkit-scrollbar{
    display: none;
}
.review_list{
    display: flex;
    height: 224px;
    width: fit-content;
    justify-content: center;
    /* overflow-x: auto; */
}

.review{
    display: flex;
    width: 204px;
    height: 244;
    flex-direction: column;
    margin: 0px 20px;
    padding: 10px;
    
    
}

.personal_info{
    display: flex;
    
    
}
.personal_info h4{
    /* display: flex; */
    /* flex-grow: 4; */
    height: 28px;
    width: 84px;
    min-width: 70%;
    max-width: 100%;
    /* margin: 0px; */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.personal_info div{
    /* flex-grow: 1; */
    width: auto;
    height: 28px;
    /* margin:0px 10px; */
}
.personal_info div img{
    width: 12px;
    height: 12px;
}
.comment{

    /* margin: auto; */
    display: block;
    width: auto;
    height: 120px;
    /* overflow: hidden; */
    padding: 5px;
    
   

}
.comment p{
   width: inherit;
   height: inherit;
   font-size: 14px;
   overflow: hidden;
   text-overflow: ellipsis; 
   white-space: pre-wrap;
   /* overflow-wrap: break-word; */
    word-break: break-word;
}

.date{
    /* justify-content: end; */
    display: flex;
    height: 100%;
    width: auto;
    /* margin-top: 10px; */
    justify-content: end;
    align-items: center;
    font-size: 10px;
}

.review_slide{
    display: flex;
   
    justify-content: center;
    align-items: center;
    margin: 10px;
}
.review_slide img{
    width: 28px;
    height: 28px;

}
.review_slide img:hover{
    cursor: pointer;
}
</style>