<script setup>
import BaseStar from '../../../components/productDetail/BaseStar.vue';
import { useRouter } from 'vue-router';
import {onBeforeMount, ref,onMounted} from 'vue'
import fetch from '../../../JS/api';
import cookie from '../../../JS/cookie';
import validation from '../../../JS/validation'
import productEnum from '../../../JS/enum/product'
import BaseSelectPage from '../../../components/BaseSelectPage.vue';
import BaseMovePage from '../../../components/accountSetting/BaseMovePage.vue';
import BaseAlert from '../../../components/BaseAlert.vue';
// link
const myRouter=useRouter()
const goAdd=()=>myRouter.push({name:'Shop_AS_add'})
const goEdit=(id)=>myRouter.push({name:'Shop_AS_add',params: {id: id }})
// Common attribute
const userName=ref('')
const productList=ref([])
let origin = `${import.meta.env.VITE_BASE_URL}`;

// filter attribute
const filterObj=ref(undefined)
const filterValuePosition=ref(0) //ตำแหน่งของค่า Filter ที่มีมากว่า 1 (0 default)
const filterValue =ref(undefined) // value of filter
// ดึงข้อมูลเกี่ยวกับรูปภาพ

// move page attribute
const currentPage=ref(1)
const allPage=ref(0)
const totalAmountItem=ref(0)
// filter item
const sortFilter=ref('')
const sortNameFilter=ref('')
// alert attribute
const isShowAlert=ref(false)
const alertType=ref(0)
const alertDetail=ref('')
const alertTime=ref(2)

// ดึงข้อมูลเกี่ยวกับ Product
const getProduct=async()=>{
    let inputData={
            page:currentPage.value, 
            // limitP:18, 
            //min:undefined,
            //max:undefined, 
            //rating:undefined, 
            //sort_name:undefined, //type of filter 
            //sort:undefined, // asc & desc
            owner:userName.value//me 
        }
    if(sortFilter.value.length!=0){
        inputData["sort"]=sortFilter.value
    }
    if(sortNameFilter.value.length!=0){
        inputData["sort_name"]=sortNameFilter.value
    }
    // if(filter!=undefined){
    //     let{sort,sort_name}=filter
        
        
    // }
    
    let {status,data,msg}=await fetch.getAllProductOfSupplier(inputData)
    if(await status){
        // if(inputData.sort_name=="sold_out"){
        //     productList.value=data.outStock
        //     console.log(data)
        // }else{
        productList.value=data.list
        currentPage.value=data.page
        totalAmountItem.value=data.allItems
        allPage.value=data.allPage
        console.log(data)
    }else
    if(await msg=='404'){
        isShowAlert.value=true
        alertType.value=1
        alertDetail.value="Sorry, we couldn't find the information you're looking for."
        alertTime.value=10
    }else{
        isShowAlert.value=true
        alertType.value=1
        alertDetail.value="Oops! It seems like there's a server error at the moment. Please try again later."
        alertTime.value=10
    }
        
    // }else{
    //     //error
    // }
            
}

// delete product
const deleteProduct=async(id)=>{
    let {status,msg}=await fetch.deleteProductById(id)
    if(await status){
        console.log('delete success')
        await getProduct()
    }else
    if(await msg=='400'){// error

        isShowAlert.value=true
        alertType.value=2
        alertDetail.value='The product cannot be deleted because the product has already been purchased.'
        alertTime.value=10
    }else{
        isShowAlert.value=true
        alertType.value=1
        alertDetail.value="Oops! It seems like there's a server error at the moment. Please try again later."
        alertTime.value=10
    }
}

// select fileter
const productFilter=async(filterItem)=>{
    let {name,value}=filterItem
    // filterValuePosition.value=0
    let element=document.getElementById(name)// for select
    let sorBtn=document.getElementsByClassName('sort_item') 
    for(let e of sorBtn){ //remove all active before
        e.classList.remove("sort_active")
    }
    
    if(value.length>1){ //more then 1 value
        
        if(filterObj.value.name==name){//if plus 1 is more then max length go back start with 0
            filterValuePosition.value=(filterValuePosition.value+1)>value.length-1?0:filterValuePosition.value+1
            // display arrow direction
        
        }else{
            filterValuePosition.value=0
        }
        filterValue.value=value[filterValuePosition.value] //assign value of filter for check
        // display arrow
        let arrowUp = document.getElementById(`${name}_sort_arrow_up`)
        let arrowDown =document.getElementById(`${name}_sort_arrow_down`)
        let sortArrow =document.getElementsByClassName(`${name}_sort_arrow`)
        // sortArrow[0].classList.remove("sort_arrow_active") // show div first time
        if(filterValue.value.type=="asc"){ //น้อยไปมาก
            sortArrow[0].classList.add("sort_arrow_active")
            arrowUp.classList.remove("arrow_active")
            arrowDown.classList.add("arrow_active")
        }else{  // มากไปน้อย
            sortArrow[0].classList.add("sort_arrow_active")
            arrowUp.classList.add("arrow_active")
            arrowDown.classList.remove("arrow_active")

        }
    }else{ // normal 1 value
        filterValuePosition.value=0
        filterValue.value=value[filterValuePosition.value]
    }
    filterObj.value=filterItem
    element.classList.add("sort_active")// show color green that selected
    // console.log(filterObj.value)
    // console.log(filterValue.value)
    // console.log(filterValuePosition.value)
    sortFilter.value=filterValue.value.type
    sortNameFilter.value=filterValue.value.name
    await getProduct()

}



// move page
const nextPage=()=>{
    // check if to next page and not out of all page
    currentPage.value=(currentPage.value+1)>allPage.value?currentPage.value:currentPage.value+1
    // document.getElementById("header_order").scrollIntoView({ behavior: "smooth" }) //go to top first
    getProduct()
}
const previousPage=()=>{
    currentPage.value=(currentPage.value-1)<=0?currentPage.value:currentPage.value-1
    // document.getElementById("header_order").scrollIntoView({ behavior: "smooth" }) //go to top first
    getProduct()
}

// reset show alert status
const getShowAlertChange=(input)=>{
    isShowAlert.value=input
    isShowAlert.value=false
    alertType.value=0
    alertDetail.value=''
    alertTime.value=2
}


onBeforeMount(async()=>{
    userName.value=cookie.decrypt().username
    // console.log(userName.value)
    // await getProduct() 
    
})
onMounted(async()=>{
    await productFilter(productEnum.sortTypeArrSupplier[0])
})
</script>
<template>
    <!-- <div class="wrapper_all"> -->
<div class="wrapper_my_shop">
    <div class="my_shop">
        <!-- header -->
        <div class="header_shop">
            <h4>
                Products
            </h4>
            <button @click="goAdd">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5 0C5.26522 0 5.51957 0.105357 5.70711 0.292893C5.89464 0.48043 6 0.734784 6 1V4H9C9.26522 4 9.51957 4.10536 9.70711 4.29289C9.89464 4.48043 10 4.73478 10 5C10 5.26522 9.89464 5.51957 9.70711 5.70711C9.51957 5.89464 9.26522 6 9 6H6V9C6 9.26522 5.89464 9.51957 5.70711 9.70711C5.51957 9.89464 5.26522 10 5 10C4.73478 10 4.48043 9.89464 4.29289 9.70711C4.10536 9.51957 4 9.26522 4 9V6H1C0.734784 6 0.48043 5.89464 0.292893 5.70711C0.105357 5.51957 0 5.26522 0 5C0 4.73478 0.105357 4.48043 0.292893 4.29289C0.48043 4.10536 0.734784 4 1 4H4V1C4 0.734784 4.10536 0.48043 4.29289 0.292893C4.48043 0.105357 4.73478 0 5 0Z" fill="white"/>
                </svg>
                New Product
            </button>
            
        </div>
        <!-- sorter -->
        <div class="sort_shop">
            <div class="sort_list">
                <button @click="productFilter(type)" v-for="(type,index) of productEnum.sortTypeArrSupplier" :id="type.name" :index="index" class="sort_item ">
                    {{type.name}}
                    <!-- up -->
                    <div   :class="`${type.name}_sort_arrow`">
                        <svg  :id="`${type.name}_sort_arrow_up`"  width="10" height="13" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.70685 5.70679C9.51908 5.89426 9.26446 5.99957 8.99896 5.99957C8.73347 5.99957 8.47884 5.89426 8.29108 5.70679L4.99396 2.41379L1.69683 5.70679C1.50799 5.88894 1.25508 5.98974 0.992552 5.98746C0.730027 5.98518 0.4789 5.88001 0.29326 5.6946C0.10762 5.5092 0.00231912 5.25838 3.78498e-05 4.99619C-0.00224342 4.73399 0.0986775 4.48139 0.281064 4.29279L4.28607 0.292787C4.47383 0.105316 4.72846 0 4.99396 0C5.25945 0 5.51408 0.105316 5.70184 0.292787L9.70685 4.29279C9.89455 4.48031 10 4.73462 10 4.99979C10 5.26495 9.89455 5.51926 9.70685 5.70679Z" fill="#212121"/>
                        </svg>

                        <!-- down -->
                        <svg  :id="`${type.name}_sort_arrow_down`"  width="10" height="13" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M0.292433 0.304675C0.479735 0.117581 0.733736 0.0124767 0.998581 0.0124767C1.26342 0.0124767 1.51743 0.117581 1.70473 0.304675L4.99376 3.59106L8.28278 0.304675C8.37492 0.209357 8.48513 0.133328 8.60699 0.0810238C8.72885 0.0287201 8.85991 0.00118918 8.99253 3.76812e-05C9.12515 -0.00111382 9.25667 0.0241369 9.37941 0.0743168C9.50216 0.124497 9.61368 0.198601 9.70746 0.292305C9.80124 0.386009 9.8754 0.497437 9.92562 0.620086C9.97584 0.742736 10.0011 0.874151 9.99996 1.00666C9.99881 1.13918 9.97126 1.27013 9.91891 1.39189C9.86656 1.51365 9.79047 1.62377 9.69508 1.71583L5.6999 5.7078C5.5126 5.8949 5.2586 6 4.99376 6C4.72891 6 4.47491 5.8949 4.28761 5.7078L0.292433 1.71583C0.105189 1.52868 0 1.27489 0 1.01026C0 0.745624 0.105189 0.491826 0.292433 0.304675Z" fill="#212121"/>
                        </svg>
                    </div>
                    

                </button>
            </div>
        </div>
        <!-- product list -->
        <div class="content_shop">
            <table >
                <tr class="header">
                    <th>
                        <h6>
                            #
                        </h6>
                    </th>
                    <th>
                        <button>
                            <h6>
                                SKU
                                <!-- <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M2.99997 0.800781C3.15909 0.800815 3.31167 0.864052 3.42417 0.976581L5.22417 2.77658C5.33346 2.88974 5.39394 3.0413 5.39257 3.19862C5.39121 3.35594 5.3281 3.50643 5.21686 3.61767C5.10562 3.72892 4.95513 3.79202 4.79781 3.79339C4.64049 3.79475 4.48893 3.73428 4.37577 3.62498L2.99997 2.24918L1.62417 3.62498C1.51101 3.73428 1.35945 3.79475 1.20213 3.79339C1.04481 3.79202 0.894323 3.72892 0.783078 3.61767C0.671834 3.50643 0.608732 3.35594 0.607365 3.19862C0.605998 3.0413 0.666475 2.88974 0.77577 2.77658L2.57577 0.976581C2.68827 0.864052 2.84085 0.800815 2.99997 0.800781ZM0.77577 6.37658C0.888286 6.2641 1.04087 6.20091 1.19997 6.20091C1.35907 6.20091 1.51165 6.2641 1.62417 6.37658L2.99997 7.75238L4.37577 6.37658C4.48893 6.26729 4.64049 6.20681 4.79781 6.20818C4.95513 6.20954 5.10562 6.27265 5.21686 6.38389C5.3281 6.49514 5.39121 6.64562 5.39257 6.80294C5.39394 6.96026 5.33346 7.11182 5.22417 7.22498L3.42417 9.02498C3.31165 9.13746 3.15907 9.20065 2.99997 9.20065C2.84087 9.20065 2.68829 9.13746 2.57577 9.02498L0.77577 7.22498C0.663287 7.11246 0.600098 6.95988 0.600098 6.80078C0.600098 6.64168 0.663287 6.4891 0.77577 6.37658Z" fill="#757575"/>
                                </svg> -->
                            </h6>
                        </button>
                    </th>
                    <th>
                        <button>
                            <h6>
                                Name
                                <!-- <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M2.99997 0.800781C3.15909 0.800815 3.31167 0.864052 3.42417 0.976581L5.22417 2.77658C5.33346 2.88974 5.39394 3.0413 5.39257 3.19862C5.39121 3.35594 5.3281 3.50643 5.21686 3.61767C5.10562 3.72892 4.95513 3.79202 4.79781 3.79339C4.64049 3.79475 4.48893 3.73428 4.37577 3.62498L2.99997 2.24918L1.62417 3.62498C1.51101 3.73428 1.35945 3.79475 1.20213 3.79339C1.04481 3.79202 0.894323 3.72892 0.783078 3.61767C0.671834 3.50643 0.608732 3.35594 0.607365 3.19862C0.605998 3.0413 0.666475 2.88974 0.77577 2.77658L2.57577 0.976581C2.68827 0.864052 2.84085 0.800815 2.99997 0.800781ZM0.77577 6.37658C0.888286 6.2641 1.04087 6.20091 1.19997 6.20091C1.35907 6.20091 1.51165 6.2641 1.62417 6.37658L2.99997 7.75238L4.37577 6.37658C4.48893 6.26729 4.64049 6.20681 4.79781 6.20818C4.95513 6.20954 5.10562 6.27265 5.21686 6.38389C5.3281 6.49514 5.39121 6.64562 5.39257 6.80294C5.39394 6.96026 5.33346 7.11182 5.22417 7.22498L3.42417 9.02498C3.31165 9.13746 3.15907 9.20065 2.99997 9.20065C2.84087 9.20065 2.68829 9.13746 2.57577 9.02498L0.77577 7.22498C0.663287 7.11246 0.600098 6.95988 0.600098 6.80078C0.600098 6.64168 0.663287 6.4891 0.77577 6.37658Z" fill="#757575"/>
                                </svg> -->
                            </h6>
                        </button>
                    </th>
                    <th>
                        <button>
                            <h6>
                                Category
                                <!-- <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M2.99997 0.800781C3.15909 0.800815 3.31167 0.864052 3.42417 0.976581L5.22417 2.77658C5.33346 2.88974 5.39394 3.0413 5.39257 3.19862C5.39121 3.35594 5.3281 3.50643 5.21686 3.61767C5.10562 3.72892 4.95513 3.79202 4.79781 3.79339C4.64049 3.79475 4.48893 3.73428 4.37577 3.62498L2.99997 2.24918L1.62417 3.62498C1.51101 3.73428 1.35945 3.79475 1.20213 3.79339C1.04481 3.79202 0.894323 3.72892 0.783078 3.61767C0.671834 3.50643 0.608732 3.35594 0.607365 3.19862C0.605998 3.0413 0.666475 2.88974 0.77577 2.77658L2.57577 0.976581C2.68827 0.864052 2.84085 0.800815 2.99997 0.800781ZM0.77577 6.37658C0.888286 6.2641 1.04087 6.20091 1.19997 6.20091C1.35907 6.20091 1.51165 6.2641 1.62417 6.37658L2.99997 7.75238L4.37577 6.37658C4.48893 6.26729 4.64049 6.20681 4.79781 6.20818C4.95513 6.20954 5.10562 6.27265 5.21686 6.38389C5.3281 6.49514 5.39121 6.64562 5.39257 6.80294C5.39394 6.96026 5.33346 7.11182 5.22417 7.22498L3.42417 9.02498C3.31165 9.13746 3.15907 9.20065 2.99997 9.20065C2.84087 9.20065 2.68829 9.13746 2.57577 9.02498L0.77577 7.22498C0.663287 7.11246 0.600098 6.95988 0.600098 6.80078C0.600098 6.64168 0.663287 6.4891 0.77577 6.37658Z" fill="#757575"/>
                                </svg> -->
                            </h6>
                        </button>
                    </th>
                    <th>
                        <button>
                            <h6>
                                Price
                                <!-- <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M2.99997 0.800781C3.15909 0.800815 3.31167 0.864052 3.42417 0.976581L5.22417 2.77658C5.33346 2.88974 5.39394 3.0413 5.39257 3.19862C5.39121 3.35594 5.3281 3.50643 5.21686 3.61767C5.10562 3.72892 4.95513 3.79202 4.79781 3.79339C4.64049 3.79475 4.48893 3.73428 4.37577 3.62498L2.99997 2.24918L1.62417 3.62498C1.51101 3.73428 1.35945 3.79475 1.20213 3.79339C1.04481 3.79202 0.894323 3.72892 0.783078 3.61767C0.671834 3.50643 0.608732 3.35594 0.607365 3.19862C0.605998 3.0413 0.666475 2.88974 0.77577 2.77658L2.57577 0.976581C2.68827 0.864052 2.84085 0.800815 2.99997 0.800781ZM0.77577 6.37658C0.888286 6.2641 1.04087 6.20091 1.19997 6.20091C1.35907 6.20091 1.51165 6.2641 1.62417 6.37658L2.99997 7.75238L4.37577 6.37658C4.48893 6.26729 4.64049 6.20681 4.79781 6.20818C4.95513 6.20954 5.10562 6.27265 5.21686 6.38389C5.3281 6.49514 5.39121 6.64562 5.39257 6.80294C5.39394 6.96026 5.33346 7.11182 5.22417 7.22498L3.42417 9.02498C3.31165 9.13746 3.15907 9.20065 2.99997 9.20065C2.84087 9.20065 2.68829 9.13746 2.57577 9.02498L0.77577 7.22498C0.663287 7.11246 0.600098 6.95988 0.600098 6.80078C0.600098 6.64168 0.663287 6.4891 0.77577 6.37658Z" fill="#757575"/>
                                </svg> -->
                            </h6>
                        </button>
                    </th>
                    <th>
                        <button>
                            <h6>
                                Stock
                                <!-- <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M2.99997 0.800781C3.15909 0.800815 3.31167 0.864052 3.42417 0.976581L5.22417 2.77658C5.33346 2.88974 5.39394 3.0413 5.39257 3.19862C5.39121 3.35594 5.3281 3.50643 5.21686 3.61767C5.10562 3.72892 4.95513 3.79202 4.79781 3.79339C4.64049 3.79475 4.48893 3.73428 4.37577 3.62498L2.99997 2.24918L1.62417 3.62498C1.51101 3.73428 1.35945 3.79475 1.20213 3.79339C1.04481 3.79202 0.894323 3.72892 0.783078 3.61767C0.671834 3.50643 0.608732 3.35594 0.607365 3.19862C0.605998 3.0413 0.666475 2.88974 0.77577 2.77658L2.57577 0.976581C2.68827 0.864052 2.84085 0.800815 2.99997 0.800781ZM0.77577 6.37658C0.888286 6.2641 1.04087 6.20091 1.19997 6.20091C1.35907 6.20091 1.51165 6.2641 1.62417 6.37658L2.99997 7.75238L4.37577 6.37658C4.48893 6.26729 4.64049 6.20681 4.79781 6.20818C4.95513 6.20954 5.10562 6.27265 5.21686 6.38389C5.3281 6.49514 5.39121 6.64562 5.39257 6.80294C5.39394 6.96026 5.33346 7.11182 5.22417 7.22498L3.42417 9.02498C3.31165 9.13746 3.15907 9.20065 2.99997 9.20065C2.84087 9.20065 2.68829 9.13746 2.57577 9.02498L0.77577 7.22498C0.663287 7.11246 0.600098 6.95988 0.600098 6.80078C0.600098 6.64168 0.663287 6.4891 0.77577 6.37658Z" fill="#757575"/>
                                </svg> -->
                            </h6>
                        </button>
                    </th>
                    <th>
                        <button>
                            <h6>
                                Rate
                                <!-- <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M2.99997 0.800781C3.15909 0.800815 3.31167 0.864052 3.42417 0.976581L5.22417 2.77658C5.33346 2.88974 5.39394 3.0413 5.39257 3.19862C5.39121 3.35594 5.3281 3.50643 5.21686 3.61767C5.10562 3.72892 4.95513 3.79202 4.79781 3.79339C4.64049 3.79475 4.48893 3.73428 4.37577 3.62498L2.99997 2.24918L1.62417 3.62498C1.51101 3.73428 1.35945 3.79475 1.20213 3.79339C1.04481 3.79202 0.894323 3.72892 0.783078 3.61767C0.671834 3.50643 0.608732 3.35594 0.607365 3.19862C0.605998 3.0413 0.666475 2.88974 0.77577 2.77658L2.57577 0.976581C2.68827 0.864052 2.84085 0.800815 2.99997 0.800781ZM0.77577 6.37658C0.888286 6.2641 1.04087 6.20091 1.19997 6.20091C1.35907 6.20091 1.51165 6.2641 1.62417 6.37658L2.99997 7.75238L4.37577 6.37658C4.48893 6.26729 4.64049 6.20681 4.79781 6.20818C4.95513 6.20954 5.10562 6.27265 5.21686 6.38389C5.3281 6.49514 5.39121 6.64562 5.39257 6.80294C5.39394 6.96026 5.33346 7.11182 5.22417 7.22498L3.42417 9.02498C3.31165 9.13746 3.15907 9.20065 2.99997 9.20065C2.84087 9.20065 2.68829 9.13746 2.57577 9.02498L0.77577 7.22498C0.663287 7.11246 0.600098 6.95988 0.600098 6.80078C0.600098 6.64168 0.663287 6.4891 0.77577 6.37658Z" fill="#757575"/>
                                </svg> -->
                            </h6>
                        </button>
                    </th>
                    <th>
                        <button>
                            <h6>
                                Operation
                                <!-- <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M2.99997 0.800781C3.15909 0.800815 3.31167 0.864052 3.42417 0.976581L5.22417 2.77658C5.33346 2.88974 5.39394 3.0413 5.39257 3.19862C5.39121 3.35594 5.3281 3.50643 5.21686 3.61767C5.10562 3.72892 4.95513 3.79202 4.79781 3.79339C4.64049 3.79475 4.48893 3.73428 4.37577 3.62498L2.99997 2.24918L1.62417 3.62498C1.51101 3.73428 1.35945 3.79475 1.20213 3.79339C1.04481 3.79202 0.894323 3.72892 0.783078 3.61767C0.671834 3.50643 0.608732 3.35594 0.607365 3.19862C0.605998 3.0413 0.666475 2.88974 0.77577 2.77658L2.57577 0.976581C2.68827 0.864052 2.84085 0.800815 2.99997 0.800781ZM0.77577 6.37658C0.888286 6.2641 1.04087 6.20091 1.19997 6.20091C1.35907 6.20091 1.51165 6.2641 1.62417 6.37658L2.99997 7.75238L4.37577 6.37658C4.48893 6.26729 4.64049 6.20681 4.79781 6.20818C4.95513 6.20954 5.10562 6.27265 5.21686 6.38389C5.3281 6.49514 5.39121 6.64562 5.39257 6.80294C5.39394 6.96026 5.33346 7.11182 5.22417 7.22498L3.42417 9.02498C3.31165 9.13746 3.15907 9.20065 2.99997 9.20065C2.84087 9.20065 2.68829 9.13746 2.57577 9.02498L0.77577 7.22498C0.663287 7.11246 0.600098 6.95988 0.600098 6.80078C0.600098 6.64168 0.663287 6.4891 0.77577 6.37658Z" fill="#757575"/>
                                </svg> -->
                            </h6>
                        </button>
                    </th>
                </tr>
                <!-- product list -->
                <tr v-for="(product,index) of productList" :kay="index" class="product_item">
                    <!-- image -->
                    <td>
                        <div>
                            <img v-if="product.image==undefined" src="../../../assets/home_p/home_design_content_english.png" alt="product_img">
                            <img v-else :src="`${origin}/api/image/products/${product.itemId}`" alt="product_img">
                        </div>
                    </td>
                    <!-- SKU -->
                    <td class="td_item">
                        <h6 class="normal_text">
                            <!-- XX231ssssss -->
                            {{ product.itemId }}
                        </h6>
                    </td>
                    <!-- name -->
                    <td>
                        <div>
                            <h5>
                                <!-- Polyscias Fabiansdfasdfasasdfasdfasdfasdfasdfasdfdfasdfsdfsdfsdfs asdfasdff 12341234123  -->
                                {{ product.name }}
                            </h5>
                            <p>
                                Variation
                            </p>
                        </div>
                    </td>
                    <!-- category -->
                    <td>
                        <div>
                            <!-- EquirementttT -->
                            {{ product.type }}
                        </div>                        
                    </td>
                    <!-- price -->
                    <td class="td_item">
                        <h6 class="normal_text">
                            <!-- 80000000.00 -->
                            {{ product.minPrice }}  {{ parseInt(product.maxPrice)==0?'':`- ${product.maxPrice}` }}
                        </h6>
                    </td>
                    <!-- stock -->
                    <td class="td_item">
                        <h6 class="normal_text">
                            {{product.allStock}}
                        </h6>
                    </td>
                    <!-- rate -->
                    <td>
                        <div>
                            <BaseStar :rating="parseInt(product.totalRating)" :isGap="false" :size="60" name="myShop" />
                        </div>
                    </td>
                    <!-- operation -->
                    <td class="td_item">
                        <div>
                            <!-- edit -->
                            <button @click="goEdit(product.itemId)">
                                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.16683 3.16762H3.00016C2.55814 3.16762 2.13421 3.34321 1.82165 3.65577C1.50909 3.96833 1.3335 4.39225 1.3335 4.83428V14.0009C1.3335 14.443 1.50909 14.8669 1.82165 15.1795C2.13421 15.492 2.55814 15.6676 3.00016 15.6676H12.1668C12.6089 15.6676 13.0328 15.492 13.3453 15.1795C13.6579 14.8669 13.8335 14.443 13.8335 14.0009V9.83428M12.6552 1.98928C12.8089 1.8301 12.9928 1.70313 13.1962 1.61578C13.3995 1.52843 13.6182 1.48245 13.8395 1.48053C14.0608 1.47861 14.2803 1.52078 14.4851 1.60458C14.6899 1.68838 14.876 1.81214 15.0325 1.96862C15.189 2.12511 15.3127 2.3112 15.3965 2.51603C15.4803 2.72085 15.5225 2.94032 15.5206 3.16162C15.5187 3.38292 15.4727 3.60162 15.3853 3.80496C15.298 4.0083 15.171 4.1922 15.0118 4.34595L7.85683 11.5009H5.50016V9.14428L12.6552 1.98928Z" stroke="#9E9E9E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                            <!-- delete -->
                            <button @click="deleteProduct(product.itemId)">
                                <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.3335 8.16667V13.1667M9.66683 8.16667V13.1667M1.3335 4.83333H14.6668M13.8335 4.83333L13.111 14.9517C13.0811 15.3722 12.8929 15.7657 12.5844 16.053C12.2759 16.3403 11.87 16.5 11.4485 16.5H4.55183C4.13028 16.5 3.72439 16.3403 3.4159 16.053C3.10742 15.7657 2.91926 15.3722 2.88933 14.9517L2.16683 4.83333H13.8335ZM10.5002 4.83333V2.33333C10.5002 2.11232 10.4124 1.90036 10.2561 1.74408C10.0998 1.5878 9.88784 1.5 9.66683 1.5H6.3335C6.11248 1.5 5.90052 1.5878 5.74424 1.74408C5.58796 1.90036 5.50016 2.11232 5.50016 2.33333V4.83333H10.5002Z" stroke="#9E9E9E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>                            
                        </div>

                    </td>
                </tr>
                
                
            </table> 
        </div>

    </div>
    <!-- move page -->
    <!-- <BaseSelectPage @current-page="" @total-page="10" /> -->
    <BaseMovePage name="my_shop" :current-page="currentPage" :total-amount-item="totalAmountItem" @previousPage="previousPage()" @nextPage="nextPage()" />
    <BaseAlert name="shop_list" :show-alert="isShowAlert" :alert-detail="alertDetail" :alert-status="alertType" :second="alertTime" @getShowAlertChange="getShowAlertChange"/>
</div>
    <!-- </div> -->

</template>
<style scoped>
*{
    box-sizing: border-box;
}
.wrapper_all {
    overflow: hidden;
    border: none;
    border-radius: 8px;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06);
    /* gap: 24px; */
}
.wrapper_my_shop{
    display: flex;
    width: 100%;
    height: fit-content;
    padding: 20px;
    gap: 24px;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    border: none;
    border-radius: 8px;
    background-color: #fff;
}
.my_shop{
    display: flex;
    width: 100%;
    height: inherit;
    flex-direction: column;
    gap: 24px;
}
.header_shop{
    display: flex;
    width: 100%;
    height: fit-content;
    justify-content: space-between;
    align-items: center;
}
.header_shop h4{
    display: flex;
    /* width: inherit; */
    height: 28px;
    font-size: 18px;
    font-weight: 500;
    color: #212121;
    align-items: center;
}
.header_shop  button{
    display: flex;
    width: 133px;
    height: 36px;
    border-radius: 4px;
    border: none;
    padding: 8px 12px 8px 8px;
    gap: 4px;
    background-color: #26AC34;
    color: #fff;
    font-size: 14px;
    font-weight: 500;
    box-shadow: 0px 1px 2px 0px #0000000D;
    align-items: center;
    justify-content: start;
    cursor: pointer;
}
.header_shop  button svg{
    width: 10px;
    height: 10px;
    margin: 5px;
}
.sort_shop{
    width: 100%;
    height: fit-content;
    overflow-x: auto;
}
.sort_list{
    display: flex;
    width: fit-content;
    height: fit-content;
    gap: 12px;
}
.sort_item{
    display: flex;
    width: fit-content;
    height: 36px;
    justify-content: center;
    align-items: center;
    border: 1px solid;
    border-radius: 4px;
    border-color: #E0E0E0;
    box-shadow: 0px 1px 2px 0px #0000000D;
    padding: 8px 12px;
    cursor: pointer;
    font-weight: 500;
    font-size: 14px;
    color: #212121;
    background-color: #fff;
    gap: 8px;
    white-space: nowrap;
}
.sort_active{
    background-color: #26AC34;
    color: #fff;
}
.sort_active svg path{
    fill: #fff;
}
.sort_item >div{
    display: none;
    width: 20px;
    height: 20px;
    justify-content: center;
    align-items: center;
}
.sort_item >div >svg{
    display: none;
    width: 100%;
    height: auto;
}
/* arrow */
/* .sort_arrow_active{
    display: flex !important;
    width: 20px !important;
    height: auto !important;
} */
/* for div */
.sort_item .sort_arrow_active{
    display: flex ;
}
/* for arrow */
.sort_item >div .arrow_active{
    display: flex ;
    width: 10px;
}

.content_shop{
    display: flex;
    flex-direction: column;
    width: 100%;
    height: fit-content;
    max-height: 45dvh;
    overflow-y: auto;
}
table{
    display: table;
    /* width: fit-content; */
    width: 100%;
    border-collapse: collapse;
    /* flex-direction: column; */
    table-layout: fixed;
}
table .header{
    width: 100%;
    height: 28px;
    vertical-align: top;
    border-bottom: 1px solid #E0E0E0;
    font-size: 12px;
    font-weight: 500;
    color: #757575;
    
}
/* column */
.header th:nth-child(1){
    width: 52px;
    min-width: fit-content;
    max-width: 100%;
}
.header th:nth-child(2){
    width: 80px;
    min-width: fit-content;
    max-width: 100%;
}
.header th:nth-child(3){
    width: 200px;
    min-width: fit-content;
    max-width: 100%;
}
.header th:nth-child(4){
    width: 116px;
    min-width: fit-content;
    max-width: 100%;
    /* width: 116px; */
}
.header th:nth-child(5){
    width: 200px;
    min-width: fit-content;
    max-width: 100%;
}
.header th:nth-child(6){
    width: 72px;
    min-width: fit-content;
    max-width: 100%;
}
.header th:nth-child(7){
    width: 84px;
    min-width: fit-content;
    max-width: 100%;
}
.header th:nth-child(8){
    width: 84px;
    min-width: fit-content;
    max-width: 100%;
}
td,th{
    text-align: left;
    
}
th button{
    display: flex;
    width: 100%;
    height: 28px;
    padding: 0px 12px;
    border: none;
    background-color: transparent;
    /* display: flex; */   
    justify-content: start;
    align-items: start; 
    cursor: pointer;
}
th button h6,th h6{
    display: flex;
    width: fit-content;
    height: 16px;
    font-size: 12px;
    font-weight: 500;
    color: #757575;
    justify-content: center;
    align-items: center;
    gap: 4px;
}
th h6 svg{
    display: flex;
    width: 12px;
    height: 12px;
    justify-content: center;
    align-items: center;
}
table .product_item{
    width: 100%;
    height: 76px;
    padding: 12px 0px;
    border-bottom:1px solid #EEEEEE;
}
.normal_text{
    font-weight: 400;
    font-size: 14px;
    text-overflow: ellipsis;
    overflow: hidden;
}
.td_item{
    padding: 16px 12px;
}
/* image */

.product_item td:nth-child(1) div{
    display: flex;
    width: 52px;
    height: 52px;
    border-radius: 4px;
    overflow: hidden;
    justify-content: center;
    align-items: center;
}
.product_item td:nth-child(1) div img{
    width: 120%;
    height: auto;
}
/* SKU */
.product_item td:nth-child(2) h6{
    width: 100%;
    height: 100%;
}
/* name */
.product_item td:nth-child(3){
    /* display: flex; */
    width: fit-content;
    max-width: 100%;
    height: 100%;
    flex-direction: column;
    padding: 6px 12px;
    align-items: center;
} 
.product_item td:nth-child(3) div{
    display: flex;
    width: fit-content;
    max-width: 100%;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
}
.product_item td:nth-child(3) div h5{
    width: fit-content;
    height: 20px;
    text-overflow: ellipsis;
    word-break: break-all;
    font-weight: 500;
    font-size: 14px;
    color: #212121;
    overflow: hidden;
}
.product_item td:nth-child(3) div p{
    width: 100%;
    height: 16px;
    text-overflow: ellipsis;
    word-break: break-all;
    font-weight: 400;
    font-size: 12px;
    color: #616161;
    overflow: hidden;

}
/* category */
.product_item td:nth-child(4){
    width: fit-content;
    height: 100%;
    padding: 12px;
}
.product_item td:nth-child(4) div{

    width: fit-content;
    min-width: 50px;
    max-width: 100%;
    height: 28px;
    padding: 4px 8px;
    background-color: #EEEEEE;
    border: none;
    border-radius: 4px;
    word-break: keep-all;
    text-overflow: ellipsis;
    overflow: hidden;
    font-weight: 400;
    font-size: 14px;
}
/* price */
.product_item td:nth-child(5) h6{
    display: flex;
    width: fit-content;
    height: 20px;
}
.product_item td:nth-child(5) h6::before{
    content: '฿ ';
}
/* stock */
.product_item td:nth-child(6) h6{
    width: fit-content;
    height: 20px;
}
/* star */
.product_item td:nth-child(7){
    padding: 20px 12px;
}
.product_item td:nth-child(7) div{
    display: flex;
    width: 100%;
    height: fit-content;
    justify-content: left;
    align-items: center;
}
/* operation */
.product_item td:nth-child(8) div{
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: left;
    align-items: center;
    gap: 8px;
}
.product_item td:nth-child(8) div button{
    display: flex;
    width: 20px;
    height: 20px;
    justify-content: center;
    align-items: center;
    border: none;
    background-color: transparent;
    cursor: pointer;
}
.product_item td:nth-child(8) div button svg{
    width: 20px;
    height: 20px;
}
</style>