<script setup>
import {ref,onUpdated, onMounted}from 'vue'
const emit =defineEmits(['sortItem', 'moveLeft', "moveRight", "showFilter"])
const props =defineProps({
    isShowFilter:{
        type:Boolean,
        require:true,
        default:false
    },
    changePage:{
        type:Object,
        require:true,
        default:{}
    },
    sortModel:{
        type:Object,
        require:true,
        default:{}
    }
})

const sortItem=ref(undefined)
// const currentPage = ref(props.changePage.currentPage)

const sortTypeArr =[
    {name:"Popular",value: {name: "popular", type: 'desc'}},
    {name:"New Arrival",value: {name: "new_arrival", type: 'desc'}},
    {name:"Top Sales",value: {name: "sales", type: 'desc'}},
    {name:"Price - Low",value: {name: "price", type: 'asc'}},
    {name:"Price - Hight",value: {name: "price", type: 'desc'}},
]

// this for show filter in baseFilter
const isShowFilter=ref(false)
const showFilter=()=>{
    // console.log('before change : '+isShowFilter.value)
    isShowFilter.value=!isShowFilter.value //false => true
    // console.log('after change : '+isShowFilter.value)
    return emit('showFilter',{show: isShowFilter.value})
}

const moveLeft = (current) => {
    return emit('moveLeft', current)
}

const moveRight = (current) => {
    return emit('moveRight', current)
}

// for sort filter
// const sortF = (data) => {
    // return emit('sortItem', data)
// }
const removeSort=()=>{
    let eSelected=document.getElementsByClassName('sort_list')
    // console.log(eSelected)
    for(let i=0;i<eSelected.length;i++){
        for(let p=0;p<eSelected[i].getElementsByTagName('button').length;p++){
            eSelected[i].getElementsByTagName('button')[p].setAttribute('style','background-color:#FFF;')

        }
    }
}
const sortSelecter=(data,name)=>{
    let eSelected=document.getElementsByName(name)
    removeSort()
    // if(data.name!=sortItem.value){   
        for(let i=0;i<eSelected.length;i++){
            eSelected[0].setAttribute('style','background-color:#26AC34;color:#FFFFFF;')
        }
            sortItem.value=data.name
    // }
    // else{
    //     removeSort()
    //     console.log('clear')
    //     sortItem.value=undefined
    // }

    return emit('sortItem', data.value)
}

onMounted(()=>{
    // start with popular
    sortSelecter(sortTypeArr[0],'sort_0')

})

onUpdated(()=>{
    // for update sync value every time change for filter button
    isShowFilter.value=props.isShowFilter
    // console.log("now this value of :"+isShowFilter.value)
    
})
</script>
<template>
    <div class="wrapper_sort">
        <div class="sort_type">
            <h4>
                Sort
            </h4>
            <div class="sort_list">
                <button v-for="(type,index) of sortTypeArr" :key="index" class="sort_item" :name="`sort_${index}`" @click="sortSelecter(type,`sort_${index}`)">
                    {{ type.name }}
                </button>
                
            </div>    
            
        </div>
        <button class="filter_b" @click="showFilter">
            <h5>
                filter
            </h5>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2.66666 5.3335H8.66665" stroke="#292929" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M11.3333 5.3335L13.3333 5.3335" stroke="#292929" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M7.33331 10.6665L13.3333 10.6665" stroke="#292929" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M2.66666 10.6665H4.66665" stroke="#292929" stroke-linecap="round" stroke-linejoin="round"/>
                <ellipse cx="5.99999" cy="10.6668" rx="1.33333" ry="1.33333" stroke="#292929"/>
                <ellipse cx="9.99999" cy="5.33333" rx="1.33333" ry="1.33333" stroke="#292929"/>
            </svg>
        </button>
        <div class="sort_move">
            <h5>
                <span>{{props.changePage.currentPage}}</span>/{{props.changePage.totalPage}}
            </h5>
            <div class="move_to">
                <button @click="moveLeft(props.changePage.currentPage)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12.707 5.29279C12.8945 5.48031 12.9998 5.73462 12.9998 5.99979C12.9998 6.26495 12.8945 6.51926 12.707 6.70679L9.41403 9.99979L12.707 13.2928C12.8892 13.4814 12.99 13.734 12.9877 13.9962C12.9854 14.2584 12.8803 14.5092 12.6948 14.6946C12.5094 14.88 12.2586 14.9852 11.9964 14.9875C11.7342 14.9897 11.4816 14.8889 11.293 14.7068L7.29303 10.7068C7.10556 10.5193 7.00024 10.265 7.00024 9.99979C7.00024 9.73462 7.10556 9.48031 7.29303 9.29279L11.293 5.29279C11.4806 5.10532 11.7349 5 12 5C12.2652 5 12.5195 5.10532 12.707 5.29279Z" fill="#424242"/>
                    </svg>
                </button>
                <button @click="moveRight(props.changePage.currentPage)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.29303 14.7069C7.10556 14.5194 7.00024 14.2651 7.00024 13.9999C7.00024 13.7348 7.10556 13.4804 7.29303 13.2929L10.586 9.99992L7.29303 6.70692C7.11087 6.51832 7.01008 6.26571 7.01236 6.00352C7.01463 5.74132 7.1198 5.49051 7.30521 5.3051C7.49062 5.11969 7.74143 5.01452 8.00363 5.01224C8.26583 5.00997 8.51843 5.11076 8.70703 5.29292L12.707 9.29292C12.8945 9.48045 12.9998 9.73475 12.9998 9.99992C12.9998 10.2651 12.8945 10.5194 12.707 10.7069L8.70703 14.7069C8.5195 14.8944 8.26519 14.9997 8.00003 14.9997C7.73487 14.9997 7.48056 14.8944 7.29303 14.7069Z" fill="#424242"/>
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

.wrapper_sort{
    display: flex;
    width: inherit;
    height: min(5.278dvw,76px);
    padding: min(1.389dvw,20px);
    border-radius: min(0.556dvw, 8px);
    background-color: #EEE;
}
.sort_type{
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    gap: min(0.833dvw,12px);
}
.sort_type h4{
    width: min(1.944dvw,28px);
    height: fit-content;
    font-size: min(0.972dvw,14px);
    /* margin-top: auto;
    margin-bottom: auto; */

}
.sort_type div{
    width: 90%;
    height: inherit;
   overflow: auto; 
}
.sort_type div::-webkit-scrollbar{
    display: none;
}
.sort_list{
    display: flex;
    width: fit-content;
    height: 24px;
    gap: min(0.833dvw,12px);
    
}
.sort_item{
    display: flex;
    width: fit-content;
    height: min(2.5dvw,36px);
    padding: min(0.556dvw,8px) min(0.833dvw,12px);
    border-radius: min(0.278dvw,4px);
    border: 0px;
    font-size: min(0.972dvw,14px);
    font-weight: 500;
    line-height: 144%; /* 20.16px */
    letter-spacing: min(0.014dvw,0.2px);
    background: #FFF;
    cursor: pointer;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
    color: #212121;
    white-space: nowrap;
}
.sort_item:hover {
    background: #26AC34;
    color: #FFF;
}
.sort_move{
    display: flex;
    width: min(9.236dvw,133px);
    height: min(2.5dvw,36px);
    gap: min(1.389dvw,20px);
    align-items: center;
    justify-content: center;
}
.sort_move h5{
    width: auto;
    height: auto;
    font-size: min(0.972dvw,14px);
}
.sort_move h5 span{
    color: #26AC34;
}
.move_to{
    display: flex;
    width: fit-content;
    height: fit-content;
    gap: min(0.278dvw,4px);
}
.move_to button {
    width: min(3.056dvw,44px);
    height: min(2.5dvw,36px);
    padding: min(0.556dvw,8px) min(0.833dvw,12px);
    border: 0px;
    background: #FFF;
    cursor: pointer;
    border-radius: min(0.278dvw, 4px);
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
    color: #212121;
}
.move_to button:hover {
    background: #26AC34;
}
.move_to button svg{
    display: flex;
    width: min(1.389dvw,20px);
    height: min(1.389dvw,20px);
    /* justify-content: center;
    align-items: center; */
    margin: auto;
}
.move_to button:hover svg path {
    fill: #FFF;
}
.filter_b{
    display: none;
}
@media(width<=744px){
    .wrapper_sort{
        height: min(6.452dvw,48px);
        padding: min(1.613dvw,12px);
    }
    .sort_type{
        gap: min(1.075dvw,8px);
    }
    .sort_type h4{
        width: min(3.226dvw,24px);
        font-size: min(1.613dvw,12px);
    }
    .sort_list{
        gap: min(1.075dvw,8px);
    }
    .sort_item{
        height: min(3.226dvw,24px);
        padding: min(0.538dvw,4px) min(1.613dvw,12px);
        font-size: min(1.613dvw,12px);
    }
    .sort_move{
        width: min(9.14dvw,68px);
        height: min(3.226dvw,24px);
    }
    .sort_move h5{
        display: none;
    }
    .move_to{
        gap: min(0.538dvw,4px);
    }
    .move_to button{
        width: min(4.301dvw,32px);
        height: min(3.226dvw,24px);
        padding: min(0.538dvw,4px) min(1.075dvw,8px);
        border-radius: min(0.538dvw, 4px);
    }
    .move_to button svg{
        width: min(2.151dvw,16px);
        height: min(2.151dvw,16px);
    }
}

@media(width<=376px){
    .wrapper_sort{
        width: 100%;
        height: min(6.383dvw,24px);
        /* padding: 0px min(4.255dvw,16px); */
        padding: 0px 0px;
        border-radius: 0px;
        background: inherit;
        align-items: center;
        justify-content: space-between;
    }
    .sort_type{
        display: none;
    }
    .sort_move{
        width: min(18.085dvw,68px);
        height: min(6.383dvw,24px);
    }
   
    .move_to {
        width: min(18.085dvw,68px);
        height: min(6.383dvw,24px);
        gap: min(1.064dvw,4px);
    }
    .move_to button{
        width: min(8.511dvw,32px);
        height: min(6.383dvw,24px);
        padding: min(1.064dvw,4px) min(2.128dvw,8px);
        border-radius: min(1.064dvw, 4px);
    }
    .move_to button svg{
        width: min(4.255dvw,16px);
        height: min(4.255dvw,16px);
    }
    .filter_b{
        display: flex;
        width: fit-content;
        height: min(6.383dvw,24px);
        padding: min(1.064dvw,4px) min(3.191dvw,12px);
        gap: min(1.064dvw,4px);
        border: none;
        background: #FFF;
        align-items: center;
        box-shadow: 0px 4px 40px 0px rgba(4, 6, 15, 0.08);
        cursor: pointer;
        border-radius: min(1.064dvw, 4px);
        color: #212121;
    }
    .filter_b:hover {
        background: #26AC34;
        color: #FFF;
    }
    .filter_b h5{
        width: fit-content;
        height: fit-content;
        font-size: min(3.191dvw,12px);
    }
    .filter_b svg{
        display: flex;
        width: min(4.255dvw,16px);
        height: min(4.255dvw,16px);
    }
    .filter_b svg path:hover {
        fill: #FFF;
    }
}
</style>