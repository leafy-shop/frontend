<script setup>
import {ref,onBeforeMount,onMounted,computed} from 'vue'
import fetch from '../../../JS/api';
import validation from '../../../JS/validation'
import cookie from '../../../JS/cookie';
import ORDERSTATUS from '../../../JS/enum/order.js'
import ORDERSTATUSCOLOR from '../../../JS/enum/orderStatusColor'
// common attribute
const date=ref('')
const uesrName=ref('')
const orderList=ref([])
const isChangeStatus=ref(false)
const orderId=ref('')
// amount of order product
const orderAmount=ref(0)
// filter attribute
const filterStatus=ref(undefined)
// move page
const currentPage=ref(1)
const allPage=ref(0)
// change status
const newStatus=ref(undefined)
// color list by order status
// const colorStatusList=[
//     {font:'#FACC15',bg:'#FFD30014'}, //pending
//     {font:'#235DFF',bg:'#235DFF14'}, //in progress
//     {font:'#12D18E',bg:'#17CE9214'}, //completed
//     {font:'#F75555',bg:'#F5484A14'}, //canceled
// ]
// date attribute
const startDate=ref("")
const endDate=ref("")
const showDateFilter=ref(false) //for show drop down
// count data
const completedCount=ref(0)
const pendingCount=ref(0)
const cancelCount=ref(0)

// filter
const resetfilterDate=async()=>{
    startDate.value=""
    endDate.value=""
    showDateFilter.value=false
    await getAllOrder()
}
// submit filter
const submitFilterDate=async()=>{
    showDateFilter.value=false //close drop down
    await getAllOrder()
}

// move page
const nextPage=()=>{
    // check if to next page and not out of all page
    currentPage.value=(currentPage.value+1)>allPage.value?currentPage.value:currentPage.value+1
    document.getElementById("header_order").scrollIntoView({ behavior: "smooth" }) //go to top first
    getAllOrder()
}
const previousPage=()=>{
    currentPage.value=(currentPage.value-1)<=0?currentPage.value:currentPage.value-1
    document.getElementById("header_order").scrollIntoView({ behavior: "smooth" }) //go to top first
    getAllOrder()
}
//computed page info
const calculatePage=computed(()=>{
    let returnData={}
    returnData["startWith"]=(currentPage.value-1)*10+1
    returnData["endWith"]=(10*currentPage.value)>orderAmount.value?orderAmount.value:(10*currentPage.value)
    return returnData
})



// get all order for supplier
const getAllOrder=async()=>{

    let inputData={
        page:currentPage.value, //current page
        status:filterStatus.value, // status
        // sort:"desc",
        // dateStart:"",
        // dateEnd:"", // wait 
        // limitP:''
    }
    if(filterStatus.value=="ALL"){ //delete status out
        delete inputData.status
    }
    if(startDate.value.length!=0){
        inputData["dateStart"]=startDate.value
    }
    if(endDate.value.length!=0){
        inputData["dateEnd"]=endDate.value
    }

    let {status,data,msg}=await fetch.getAllOrder(true,inputData)
    if(status){
        console.log(data)
        orderList.value=data.list
        orderAmount.value=data.allItems
        allPage.value=data.allPage

    }
}
// get order status count
const getOrderStatusCount=async(orderStatus)=>{
    let {data,status}= await fetch.getOrderStatusCount(orderStatus)
    if(status){
        return data.count
    }else{
        return 0
    }
}

// const 
const showDetail=(id)=>{
    let detailElement=document.getElementById(id)
    // console.log(detailElement)
    detailElement.classList.toggle('order_detail_on')
    // detailElement.setAttribute('style','display:flex')
}

// filter order
const filterOrder=async(name,filterItem="ALL")=>{
    let element=document.getElementById(name)
    let allElement=document.getElementsByClassName('sort_item') //all sort item
    // clear first
    for(let e of allElement){ 
        e.classList.remove("sort_item_active")
    }
    if(filterItem=="ALL"){
        filterStatus.value="ALL"
        element.classList.add("sort_item_active")
    }else
    if(filterItem==ORDERSTATUS.COMPLETED){
        filterStatus.value=ORDERSTATUS.COMPLETED
        element.classList.add("sort_item_active")
    }else
    if(filterItem==ORDERSTATUS.PENDING){
        filterStatus.value=ORDERSTATUS.PENDING
        element.classList.add("sort_item_active")
    }else
    if(filterItem==ORDERSTATUS.CANCELED){
        filterStatus.value=ORDERSTATUS.CANCELED
        element.classList.add("sort_item_active")
    }
    
    currentPage.value=1 //set to default
    await getAllOrder()
}

// use for calculate next setp only
const calculateStatusStep=(currentStatus)=>{
    if(currentStatus!=undefined){
        let statusValue = Object.values(ORDERSTATUS)
        let indexCurrent =statusValue.indexOf(currentStatus) // check index that of step in order status
        let step =statusValue.slice(indexCurrent+1,statusValue.length-2)//list all not calcel and complete tho
        // console.log(currentStatus)
        // console.log(step )
        return step
    }
    
}
const calculateStatusStepColor=(currentStatus)=>{
    if(currentStatus!=undefined){
        let statusValue = Object.values(ORDERSTATUS)
        let indexCurrent =statusValue.indexOf(currentStatus)
        return ORDERSTATUSCOLOR[indexCurrent]
    }

}

// change status
const changeStatus=async()=>{
    let inputData={}
    if(newStatus.value!=undefined){ //check new status
        inputData["orderStatus"]=newStatus.value
    }
    inputData["shippedDate"]=validation.getDateTime(new Date()) //get date
    let {status,msg}=await fetch.changeOrderStatus(orderId.value,inputData)
    if(status){
        console.log("change successful")
        isChangeStatus.value=false
        await getAllOrder()
        //chear 
        orderId.value=""
        newStatus.value=undefined
        resetStatusSelection() 
    }else{
        // error
        console.log("error something")
        
    }
}
// call confirm to show 
const detectStatusChange=(event)=>{
    //console.log(event.target.value) //get order value
    if(event.target.value!=undefined){
        newStatus.value=event.target.value
    }
    // console.log(event.target.id) 
    if(event.target.id!=undefined){//get order id
        orderId.value=event.target.id
        // first pop up before
        isChangeStatus.value=true
        // after that if status === true 
        //let change with api
    }
    
}
// confirm change
const confirmBank = async (input = false) => {
    if (!input){//cancel
        isChangeStatus.value = false
        await getAllOrder()
        resetStatusSelection()
    }else {

        // change status 
        if (orderId.value.length != 0) {
            await changeStatus();
            
        }
        else {
            isChangeStatus.value = false
            console.log("close overlay")
            resetStatusSelection()
        }
    }
}
//reset status selection all
const resetStatusSelection=async ()=>{
    pendingCount.value= await getOrderStatusCount(ORDERSTATUS.PENDING)
    let allElement=document.getElementsByClassName("status_selection")
    for(let selection of allElement){
        selection.selectedIndex=0
    }
}

onBeforeMount(async()=>{
    // assign username
    uesrName.value=cookie.decrypt().username
    // await getAllOrder()
    completedCount.value =await getOrderStatusCount(ORDERSTATUS.COMPLETED)
    pendingCount.value= await getOrderStatusCount(ORDERSTATUS.PENDING)
    cancelCount.value =await getOrderStatusCount(ORDERSTATUS.CANCELED)
})
onMounted(async()=>{
    await filterOrder("filter_all")
    
})
</script>
<template>
<div  id="header_order" class="wrapper_orders">
    <div class="orders">
        <!-- header -->
        <div class="header_orders">
            <h4>
                Orders
            </h4>
            <!-- <button id="date_rage_picker" >
                <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.6757 1.30653L11.6766 1.93122C13.9721 2.11113 15.4885 3.67534 15.4909 6.07414L15.5 13.0956C15.5033 15.711 13.8602 17.3202 11.2265 17.3243L4.79324 17.3327C2.17599 17.336 0.512347 15.6885 0.509056 13.0656L0.500006 6.12662C0.496714 3.71199 1.95961 2.15194 4.25514 1.94121L4.25432 1.31653C4.2535 0.950042 4.52501 0.674347 4.88703 0.674347C5.24905 0.673514 5.52057 0.948376 5.52139 1.31486L5.52221 1.8979L10.4095 1.89124L10.4087 1.3082C10.4078 0.941713 10.6794 0.66685 11.0414 0.666018C11.3952 0.665185 11.6749 0.940047 11.6757 1.30653ZM1.7679 6.38399L14.2247 6.36733V6.07581C14.1893 4.28504 13.2908 3.34551 11.6782 3.20558L11.679 3.84692C11.679 4.20508 11.4001 4.4891 11.0463 4.4891C10.6843 4.48994 10.412 4.20674 10.412 3.84859L10.4111 3.17393L5.52386 3.18059L5.52468 3.85442C5.52468 4.21341 5.25399 4.4966 4.89197 4.4966C4.52995 4.49743 4.25761 4.21507 4.25761 3.85609L4.25679 3.21474C2.65238 3.37549 1.76461 4.31835 1.76708 6.12495L1.7679 6.38399ZM10.6999 10.1696V10.1788C10.7081 10.5619 11.0208 10.8526 11.4001 10.8443C11.7704 10.8351 12.0657 10.5178 12.0575 10.1346C12.0402 9.76813 11.7432 9.46911 11.3738 9.46994C10.9953 9.47827 10.6991 9.78645 10.6999 10.1696ZM11.3795 13.9094C11.0011 13.9011 10.6958 13.5854 10.695 13.2022C10.6868 12.8191 10.9904 12.5018 11.3688 12.4926H11.3771C11.7638 12.4926 12.0772 12.8083 12.0772 13.1997C12.0781 13.5912 11.7654 13.9086 11.3795 13.9094ZM7.3101 10.1829C7.32655 10.5661 7.64003 10.8651 8.01851 10.8484C8.38875 10.8309 8.68413 10.5144 8.66768 10.1313C8.65862 9.75646 8.3542 9.46494 7.98395 9.46578C7.60547 9.48244 7.30928 9.79978 7.3101 10.1829ZM8.0218 13.8719C7.64332 13.8886 7.33067 13.5895 7.31339 13.2064C7.31339 12.8233 7.60877 12.5068 7.98724 12.4893C8.35749 12.4884 8.66274 12.78 8.67097 13.1539C8.68824 13.5379 8.39205 13.8544 8.0218 13.8719ZM3.92027 10.2121C3.93673 10.5952 4.2502 10.8951 4.62868 10.8776C4.99893 10.8609 5.2943 10.5436 5.27703 10.1604C5.2688 9.78562 4.96437 9.4941 4.5933 9.49493C4.21483 9.51159 3.91945 9.82893 3.92027 10.2121ZM4.63197 13.8761C4.2535 13.8936 3.94084 13.5937 3.92356 13.2106C3.92274 12.8274 4.21894 12.5101 4.59741 12.4934C4.96766 12.4926 5.27291 12.7841 5.28114 13.1589C5.29842 13.5421 5.00304 13.8594 4.63197 13.8761Z" fill="white"/>
                </svg>
                <input v-model="date" type="date" id="date_selection">
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0.292433 0.304675C0.479735 0.117581 0.733736 0.0124767 0.998581 0.0124767C1.26342 0.0124767 1.51743 0.117581 1.70473 0.304675L4.99376 3.59106L8.28278 0.304675C8.37492 0.209357 8.48513 0.133328 8.60699 0.0810238C8.72885 0.0287201 8.85991 0.00118918 8.99253 3.76812e-05C9.12515 -0.00111382 9.25667 0.0241369 9.37941 0.0743168C9.50216 0.124497 9.61368 0.198601 9.70746 0.292305C9.80124 0.386009 9.8754 0.497437 9.92562 0.620086C9.97584 0.742736 10.0011 0.874151 9.99996 1.00666C9.99881 1.13918 9.97126 1.27013 9.91891 1.39189C9.86656 1.51365 9.79047 1.62377 9.69508 1.71583L5.6999 5.7078C5.5126 5.8949 5.2586 6 4.99376 6C4.72891 6 4.47491 5.8949 4.28761 5.7078L0.292433 1.71583C0.105189 1.52868 0 1.27489 0 1.01026C0 0.745624 0.105189 0.491826 0.292433 0.304675Z" fill="white"/>
                </svg>
                
            </button> -->
            <div   id="date_rage_picker" >
                <button @click="showDateFilter=!showDateFilter">
                    <div>
                        <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.6757 1.30653L11.6766 1.93122C13.9721 2.11113 15.4885 3.67534 15.4909 6.07414L15.5 13.0956C15.5033 15.711 13.8602 17.3202 11.2265 17.3243L4.79324 17.3327C2.17599 17.336 0.512347 15.6885 0.509056 13.0656L0.500006 6.12662C0.496714 3.71199 1.95961 2.15194 4.25514 1.94121L4.25432 1.31653C4.2535 0.950042 4.52501 0.674347 4.88703 0.674347C5.24905 0.673514 5.52057 0.948376 5.52139 1.31486L5.52221 1.8979L10.4095 1.89124L10.4087 1.3082C10.4078 0.941713 10.6794 0.66685 11.0414 0.666018C11.3952 0.665185 11.6749 0.940047 11.6757 1.30653ZM1.7679 6.38399L14.2247 6.36733V6.07581C14.1893 4.28504 13.2908 3.34551 11.6782 3.20558L11.679 3.84692C11.679 4.20508 11.4001 4.4891 11.0463 4.4891C10.6843 4.48994 10.412 4.20674 10.412 3.84859L10.4111 3.17393L5.52386 3.18059L5.52468 3.85442C5.52468 4.21341 5.25399 4.4966 4.89197 4.4966C4.52995 4.49743 4.25761 4.21507 4.25761 3.85609L4.25679 3.21474C2.65238 3.37549 1.76461 4.31835 1.76708 6.12495L1.7679 6.38399ZM10.6999 10.1696V10.1788C10.7081 10.5619 11.0208 10.8526 11.4001 10.8443C11.7704 10.8351 12.0657 10.5178 12.0575 10.1346C12.0402 9.76813 11.7432 9.46911 11.3738 9.46994C10.9953 9.47827 10.6991 9.78645 10.6999 10.1696ZM11.3795 13.9094C11.0011 13.9011 10.6958 13.5854 10.695 13.2022C10.6868 12.8191 10.9904 12.5018 11.3688 12.4926H11.3771C11.7638 12.4926 12.0772 12.8083 12.0772 13.1997C12.0781 13.5912 11.7654 13.9086 11.3795 13.9094ZM7.3101 10.1829C7.32655 10.5661 7.64003 10.8651 8.01851 10.8484C8.38875 10.8309 8.68413 10.5144 8.66768 10.1313C8.65862 9.75646 8.3542 9.46494 7.98395 9.46578C7.60547 9.48244 7.30928 9.79978 7.3101 10.1829ZM8.0218 13.8719C7.64332 13.8886 7.33067 13.5895 7.31339 13.2064C7.31339 12.8233 7.60877 12.5068 7.98724 12.4893C8.35749 12.4884 8.66274 12.78 8.67097 13.1539C8.68824 13.5379 8.39205 13.8544 8.0218 13.8719ZM3.92027 10.2121C3.93673 10.5952 4.2502 10.8951 4.62868 10.8776C4.99893 10.8609 5.2943 10.5436 5.27703 10.1604C5.2688 9.78562 4.96437 9.4941 4.5933 9.49493C4.21483 9.51159 3.91945 9.82893 3.92027 10.2121ZM4.63197 13.8761C4.2535 13.8936 3.94084 13.5937 3.92356 13.2106C3.92274 12.8274 4.21894 12.5101 4.59741 12.4934C4.96766 12.4926 5.27291 12.7841 5.28114 13.1589C5.29842 13.5421 5.00304 13.8594 4.63197 13.8761Z" fill="white"/>
                        </svg>
                    </div>
                    <h6>
                        <!-- start &end -->
                        <span v-if="startDate.length!=0">
                            {{startDate.substring(5)}}
                            
                            <span v-show="endDate.length!=0">
                                -  
                                {{endDate.substring(5)}}
                            </span>
                        </span>
                        <!--  -->
                        <span v-else>
                            Date filter
                        </span>
                    </h6>
                </button>
                <!-- drop down -->
                <div v-show="showDateFilter"   id="date_range_drop">
                    <!-- start -->
                    <label for="start_date">
                        <h6>
                            Start
                        </h6>
                        <input v-model="startDate" type="date" id="start_date" :max="endDate" />
                    </label>
                    
                    <!-- end -->
                    <label for="end_date">
                        <h6>
                            End
                        </h6>
                        <input v-model="endDate" type="date" id="end_date" :min="startDate"/>
                    </label>

                    <!-- operator -->
                    <div>
                        <!-- reset -->
                        <button @click="resetfilterDate()" class="reset_date">
                            Reset
                        </button>
                        <!-- filter -->
                        <button @click="submitFilterDate()" class="submit_date">
                            Submit
                        </button>
                    </div>
                </div>  
            </div>
            
            
            
        </div>

        <!-- sorter type-->
        <div class="sort_orders">
            <div class="sort_list">
                <!-- all orders -->
                <button @click="filterOrder('filter_all')" id="filter_all" class="sort_item">
                    <h4>
                        All orders
                    </h4>
                    <p>
                        {{orderAmount}}
                    </p>
                </button>
                <!-- complete -->
                <button @click="filterOrder('filter_complete',ORDERSTATUS.COMPLETED)" id="filter_complete" class="sort_item">
                    <h4>
                        Completed
                    </h4>
                    <p>
                        {{completedCount}}
                    </p>
                </button>
                <!-- padding -->
                <button @click="filterOrder('filter_pending',ORDERSTATUS.PENDING)" id="filter_pending" class="sort_item">
                    <h4>
                        Pending
                    </h4>
                    <p>
                        {{pendingCount}}
                    </p>
                </button>
                <!-- cancel -->
                <button @click="filterOrder('filter_cancel',ORDERSTATUS.CANCELED)" id="filter_cancel" class="sort_item">
                    <h4>
                        Cancel
                    </h4>
                    <p>
                        {{cancelCount}}
                    </p>
                </button>
            </div>
        </div>

        <!-- order list -->
        <div class="content_orders">
            <!-- <table> -->
                <div class="title_orders">
                    <div class="order_number">
                        <h5>
                           # 
                        </h5>
                    </div>
                    <div class="order_empty">

                    </div>
                    <div class="order_id">
                        <button>
                            <h5>
                                Order ID
                                <!-- <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M2.99997 0.800781C3.15909 0.800815 3.31167 0.864052 3.42417 0.976581L5.22417 2.77658C5.33346 2.88974 5.39394 3.0413 5.39257 3.19862C5.39121 3.35594 5.3281 3.50643 5.21686 3.61767C5.10562 3.72892 4.95513 3.79202 4.79781 3.79339C4.64049 3.79475 4.48893 3.73428 4.37577 3.62498L2.99997 2.24918L1.62417 3.62498C1.51101 3.73428 1.35945 3.79475 1.20213 3.79339C1.04481 3.79202 0.894323 3.72892 0.783078 3.61767C0.671834 3.50643 0.608732 3.35594 0.607365 3.19862C0.605998 3.0413 0.666475 2.88974 0.77577 2.77658L2.57577 0.976581C2.68827 0.864052 2.84085 0.800815 2.99997 0.800781ZM0.77577 6.37658C0.888286 6.2641 1.04087 6.20091 1.19997 6.20091C1.35907 6.20091 1.51165 6.2641 1.62417 6.37658L2.99997 7.75238L4.37577 6.37658C4.48893 6.26729 4.64049 6.20681 4.79781 6.20818C4.95513 6.20954 5.10562 6.27265 5.21686 6.38389C5.3281 6.49514 5.39121 6.64562 5.39257 6.80294C5.39394 6.96026 5.33346 7.11182 5.22417 7.22498L3.42417 9.02498C3.31165 9.13746 3.15907 9.20065 2.99997 9.20065C2.84087 9.20065 2.68829 9.13746 2.57577 9.02498L0.77577 7.22498C0.663287 7.11246 0.600098 6.95988 0.600098 6.80078C0.600098 6.64168 0.663287 6.4891 0.77577 6.37658Z" fill="#757575"/>
                                </svg> -->
                            </h5>
                        </button>
                    </div>
                    <div class="order_customer">
                        <button>
                            <h5>
                                Customer
                                <!-- <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M2.99997 0.800781C3.15909 0.800815 3.31167 0.864052 3.42417 0.976581L5.22417 2.77658C5.33346 2.88974 5.39394 3.0413 5.39257 3.19862C5.39121 3.35594 5.3281 3.50643 5.21686 3.61767C5.10562 3.72892 4.95513 3.79202 4.79781 3.79339C4.64049 3.79475 4.48893 3.73428 4.37577 3.62498L2.99997 2.24918L1.62417 3.62498C1.51101 3.73428 1.35945 3.79475 1.20213 3.79339C1.04481 3.79202 0.894323 3.72892 0.783078 3.61767C0.671834 3.50643 0.608732 3.35594 0.607365 3.19862C0.605998 3.0413 0.666475 2.88974 0.77577 2.77658L2.57577 0.976581C2.68827 0.864052 2.84085 0.800815 2.99997 0.800781ZM0.77577 6.37658C0.888286 6.2641 1.04087 6.20091 1.19997 6.20091C1.35907 6.20091 1.51165 6.2641 1.62417 6.37658L2.99997 7.75238L4.37577 6.37658C4.48893 6.26729 4.64049 6.20681 4.79781 6.20818C4.95513 6.20954 5.10562 6.27265 5.21686 6.38389C5.3281 6.49514 5.39121 6.64562 5.39257 6.80294C5.39394 6.96026 5.33346 7.11182 5.22417 7.22498L3.42417 9.02498C3.31165 9.13746 3.15907 9.20065 2.99997 9.20065C2.84087 9.20065 2.68829 9.13746 2.57577 9.02498L0.77577 7.22498C0.663287 7.11246 0.600098 6.95988 0.600098 6.80078C0.600098 6.64168 0.663287 6.4891 0.77577 6.37658Z" fill="#757575"/>
                                </svg> -->
                            </h5>
                        </button>
                    </div>
                    <div class="order_address">
                        <button>
                            <h5>
                                Address
                                <!-- <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M2.99997 0.800781C3.15909 0.800815 3.31167 0.864052 3.42417 0.976581L5.22417 2.77658C5.33346 2.88974 5.39394 3.0413 5.39257 3.19862C5.39121 3.35594 5.3281 3.50643 5.21686 3.61767C5.10562 3.72892 4.95513 3.79202 4.79781 3.79339C4.64049 3.79475 4.48893 3.73428 4.37577 3.62498L2.99997 2.24918L1.62417 3.62498C1.51101 3.73428 1.35945 3.79475 1.20213 3.79339C1.04481 3.79202 0.894323 3.72892 0.783078 3.61767C0.671834 3.50643 0.608732 3.35594 0.607365 3.19862C0.605998 3.0413 0.666475 2.88974 0.77577 2.77658L2.57577 0.976581C2.68827 0.864052 2.84085 0.800815 2.99997 0.800781ZM0.77577 6.37658C0.888286 6.2641 1.04087 6.20091 1.19997 6.20091C1.35907 6.20091 1.51165 6.2641 1.62417 6.37658L2.99997 7.75238L4.37577 6.37658C4.48893 6.26729 4.64049 6.20681 4.79781 6.20818C4.95513 6.20954 5.10562 6.27265 5.21686 6.38389C5.3281 6.49514 5.39121 6.64562 5.39257 6.80294C5.39394 6.96026 5.33346 7.11182 5.22417 7.22498L3.42417 9.02498C3.31165 9.13746 3.15907 9.20065 2.99997 9.20065C2.84087 9.20065 2.68829 9.13746 2.57577 9.02498L0.77577 7.22498C0.663287 7.11246 0.600098 6.95988 0.600098 6.80078C0.600098 6.64168 0.663287 6.4891 0.77577 6.37658Z" fill="#757575"/>
                                </svg> -->
                            </h5>
                        </button>
                    </div>
                    <div class="order_date">
                        <button>
                            <h5>
                                Date
                                <!-- <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M2.99997 0.800781C3.15909 0.800815 3.31167 0.864052 3.42417 0.976581L5.22417 2.77658C5.33346 2.88974 5.39394 3.0413 5.39257 3.19862C5.39121 3.35594 5.3281 3.50643 5.21686 3.61767C5.10562 3.72892 4.95513 3.79202 4.79781 3.79339C4.64049 3.79475 4.48893 3.73428 4.37577 3.62498L2.99997 2.24918L1.62417 3.62498C1.51101 3.73428 1.35945 3.79475 1.20213 3.79339C1.04481 3.79202 0.894323 3.72892 0.783078 3.61767C0.671834 3.50643 0.608732 3.35594 0.607365 3.19862C0.605998 3.0413 0.666475 2.88974 0.77577 2.77658L2.57577 0.976581C2.68827 0.864052 2.84085 0.800815 2.99997 0.800781ZM0.77577 6.37658C0.888286 6.2641 1.04087 6.20091 1.19997 6.20091C1.35907 6.20091 1.51165 6.2641 1.62417 6.37658L2.99997 7.75238L4.37577 6.37658C4.48893 6.26729 4.64049 6.20681 4.79781 6.20818C4.95513 6.20954 5.10562 6.27265 5.21686 6.38389C5.3281 6.49514 5.39121 6.64562 5.39257 6.80294C5.39394 6.96026 5.33346 7.11182 5.22417 7.22498L3.42417 9.02498C3.31165 9.13746 3.15907 9.20065 2.99997 9.20065C2.84087 9.20065 2.68829 9.13746 2.57577 9.02498L0.77577 7.22498C0.663287 7.11246 0.600098 6.95988 0.600098 6.80078C0.600098 6.64168 0.663287 6.4891 0.77577 6.37658Z" fill="#757575"/>
                                </svg> -->
                            </h5>
                        </button>
                    </div>
                    <div class="order_price">
                        <button>
                            <h5>
                                Price
                                <!-- <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M2.99997 0.800781C3.15909 0.800815 3.31167 0.864052 3.42417 0.976581L5.22417 2.77658C5.33346 2.88974 5.39394 3.0413 5.39257 3.19862C5.39121 3.35594 5.3281 3.50643 5.21686 3.61767C5.10562 3.72892 4.95513 3.79202 4.79781 3.79339C4.64049 3.79475 4.48893 3.73428 4.37577 3.62498L2.99997 2.24918L1.62417 3.62498C1.51101 3.73428 1.35945 3.79475 1.20213 3.79339C1.04481 3.79202 0.894323 3.72892 0.783078 3.61767C0.671834 3.50643 0.608732 3.35594 0.607365 3.19862C0.605998 3.0413 0.666475 2.88974 0.77577 2.77658L2.57577 0.976581C2.68827 0.864052 2.84085 0.800815 2.99997 0.800781ZM0.77577 6.37658C0.888286 6.2641 1.04087 6.20091 1.19997 6.20091C1.35907 6.20091 1.51165 6.2641 1.62417 6.37658L2.99997 7.75238L4.37577 6.37658C4.48893 6.26729 4.64049 6.20681 4.79781 6.20818C4.95513 6.20954 5.10562 6.27265 5.21686 6.38389C5.3281 6.49514 5.39121 6.64562 5.39257 6.80294C5.39394 6.96026 5.33346 7.11182 5.22417 7.22498L3.42417 9.02498C3.31165 9.13746 3.15907 9.20065 2.99997 9.20065C2.84087 9.20065 2.68829 9.13746 2.57577 9.02498L0.77577 7.22498C0.663287 7.11246 0.600098 6.95988 0.600098 6.80078C0.600098 6.64168 0.663287 6.4891 0.77577 6.37658Z" fill="#757575"/>
                                </svg> -->
                            </h5>
                        </button>
                    </div>
                    <div class="order_status">
                        <button>
                            <h5>
                                status
                                <!-- <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M2.99997 0.800781C3.15909 0.800815 3.31167 0.864052 3.42417 0.976581L5.22417 2.77658C5.33346 2.88974 5.39394 3.0413 5.39257 3.19862C5.39121 3.35594 5.3281 3.50643 5.21686 3.61767C5.10562 3.72892 4.95513 3.79202 4.79781 3.79339C4.64049 3.79475 4.48893 3.73428 4.37577 3.62498L2.99997 2.24918L1.62417 3.62498C1.51101 3.73428 1.35945 3.79475 1.20213 3.79339C1.04481 3.79202 0.894323 3.72892 0.783078 3.61767C0.671834 3.50643 0.608732 3.35594 0.607365 3.19862C0.605998 3.0413 0.666475 2.88974 0.77577 2.77658L2.57577 0.976581C2.68827 0.864052 2.84085 0.800815 2.99997 0.800781ZM0.77577 6.37658C0.888286 6.2641 1.04087 6.20091 1.19997 6.20091C1.35907 6.20091 1.51165 6.2641 1.62417 6.37658L2.99997 7.75238L4.37577 6.37658C4.48893 6.26729 4.64049 6.20681 4.79781 6.20818C4.95513 6.20954 5.10562 6.27265 5.21686 6.38389C5.3281 6.49514 5.39121 6.64562 5.39257 6.80294C5.39394 6.96026 5.33346 7.11182 5.22417 7.22498L3.42417 9.02498C3.31165 9.13746 3.15907 9.20065 2.99997 9.20065C2.84087 9.20065 2.68829 9.13746 2.57577 9.02498L0.77577 7.22498C0.663287 7.11246 0.600098 6.95988 0.600098 6.80078C0.600098 6.64168 0.663287 6.4891 0.77577 6.37658Z" fill="#757575"/>
                                </svg> -->
                            </h5>
                        </button>
                    </div>
                </div>
                <div v-for="(order,index) of orderList" :key="index" class="wrapper_order_item" >
                    <!-- order item -->
                    <div  class="order_item">
                        <!-- order of item -->
                        <div class="order_number">
                            <h6>
                                {{(calculatePage.startWith+index)}}
                            </h6>
                        </div>
                        <!-- button detail -->
                        <div class="order_empty">
                            <button @click="showDetail(`order_detail_${order.orderId}`)" >
                                <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4.29289 4.99943L3.93934 5.35298L0.646393 8.64593C0.646376 8.64595 0.646358 8.64597 0.64634 8.64598C0.552638 8.73974 0.5 8.86687 0.5 8.99943C0.5 9.13201 0.552658 9.25917 0.646393 9.35293C0.740147 9.4466 0.867254 9.49922 0.999786 9.49922C1.13234 9.49922 1.25947 9.44658 1.35323 9.35288L4.29289 4.99943ZM4.29289 4.99943L3.93934 4.64588L0.649938 1.35648C0.560432 1.26246 0.510965 1.13727 0.512093 1.00737C0.513232 0.876276 0.565817 0.75087 0.658521 0.658166C0.751225 0.565461 0.876632 0.512877 1.00773 0.511738C1.13763 0.510609 1.26281 0.560076 1.35683 0.649582L5.35318 4.64593C5.3532 4.64595 5.35322 4.64597 5.35323 4.64598C5.44694 4.73974 5.49957 4.86687 5.49957 4.99943C5.49957 5.13199 5.44694 5.25912 5.35323 5.35288C5.35322 5.35289 5.3532 5.35291 5.35318 5.35293L1.35329 9.35282L4.29289 4.99943Z" fill="#212121" stroke="#212121"/>
                                </svg>
                            </button>
                        </div>
                        <!-- order id -->
                        <div class="order_id">
                            <h6 class="padding_info">
                                <!-- 123456asdfasdfasdf -->
                                {{ order.orderId }}
                            </h6>
                        </div>
                        <!-- customer nanem -->
                        <div class="order_customer">
                            <h6 class="padding_info">
                                <!-- Apple juiceasdfasdfasdfasdf -->
                                {{ order.customerName }}
                            </h6>
                        </div>
                        <!-- Address -->
                        <div class="order_address">
                            <p class="padding_info">
                                <!-- King Mongkut's Universityasdfasdfasdfasdfasdfasdfasdfasdfasdf -->
                                {{ order.address }}
                            </p>
                        </div>
                        <!-- date -->
                        <div class="order_date">
                            <h6 class="padding_info">
                                <!-- 10/03/2024asdfasdf -->
                                {{ order.createdAt }}<!-- shippedDate -->
                            </h6>
                        </div>
                        <!-- price -->
                        <div class="order_price">
                            <h6 class="padding_info">
                                ${{order.total}}
                            </h6>
                        </div>
                        <!-- status -->
                        <div class="order_status">
                            <div>
                                <!-- <button @click="showDropDown(`order_${order.orderId}`,order.orderId)">
                                    {{order.status}}
                                    <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3.995 4.17928L3.64159 3.82615L1.01042 1.1971C1.01041 1.19708 1.01039 1.19706 1.01037 1.19705C0.954329 1.14109 0.878262 1.10959 0.798864 1.10959C0.719492 1.10959 0.643448 1.14107 0.587411 1.19699L3.995 4.17928ZM3.995 4.17928L4.34842 3.82615M3.995 4.17928L4.34842 3.82615M4.34842 3.82615L6.97964 1.19705L6.97969 1.1971M4.34842 3.82615L6.97969 1.1971M6.97969 1.1971L6.98573 1.19085M6.97969 1.1971L6.98573 1.19085M6.98573 1.19085C7.0133 1.16233 7.04629 1.13956 7.0828 1.12389C7.11932 1.10822 7.1586 1.09997 7.19836 1.09962C7.23812 1.09928 7.27755 1.10685 7.31433 1.12188C7.35111 1.13692 7.3845 1.15911 7.41255 1.18715L7.76597 0.833453M6.98573 1.19085L7.76597 0.833453M7.76597 0.833453L7.41256 1.18715C7.44061 1.21518 7.46278 1.2485 7.47778 1.28514C7.49279 1.32178 7.50033 1.36103 7.49999 1.40059C7.49964 1.44016 7.49142 1.47926 7.47578 1.51564C7.46014 1.55202 7.4374 1.58495 7.40885 1.61249L7.4088 1.61244M7.76597 0.833453L7.4088 1.61244M7.4088 1.61244L7.40265 1.61858L4.20656 4.8121M7.4088 1.61244L4.20656 4.8121M4.20656 4.8121C4.20655 4.81212 4.20653 4.81214 4.20651 4.81215M4.20656 4.8121L4.20651 4.81215M4.20651 4.81215C4.15047 4.86811 4.0744 4.89961 3.995 4.89961M4.20651 4.81215L3.995 4.89961M3.995 4.89961C3.91561 4.89961 3.83954 4.86811 3.7835 4.81215M3.995 4.89961L3.7835 4.81215M3.7835 4.81215C3.78348 4.81214 3.78346 4.81212 3.78345 4.8121M3.7835 4.81215L3.78345 4.8121M3.78345 4.8121L0.587411 1.61864L3.78345 4.8121ZM0.5 1.40781C0.5 1.48678 0.531375 1.5626 0.587358 1.61858L0.5 1.40781ZM0.5 1.40781C0.5 1.32887 0.531355 1.25308 0.587305 1.1971L0.5 1.40781Z" fill="#424242" stroke="#424242"/>
                                    </svg>

                                </button> -->
                                <!-- {{order.status}} -->
                                <select :disabled="calculateStatusStep(order.status).length==0?true:false" @change="detectStatusChange" :id="order.orderId"
                                :style="[`background-color:${calculateStatusStepColor(order.status).bg};color:${calculateStatusStepColor(order.status).font};`]" class="status_selection">
                                    <option 
                                    :value="order.status" 
                                    selected
                                    hidden
                                    >
                                        {{order.status}}
                                    </option>
                                    <option v-show="calculateStatusStep(order.status).length!=0" v-for="(status,index) of calculateStatusStep(order.status)" 
                                    :style="[`background-color:${calculateStatusStepColor(status).bg};color:${calculateStatusStepColor(status).font};`]" 
                                    :key="index" :value="status" >
                                        {{status}}
                                    </option>
                                </select>
                                <!-- drop down -->
                                <!-- <div :id="`order_${order.orderId}`" class="">
                                    status
                                    <button v-for="(status,index) of ORDERSTATUS" :key="index">
                                        {{ status }}
                                    </button>
                                </div> -->
                            </div>
                        </div>
                    </div>
                    <!-- detail -->
                    <div :id="`order_detail_${order.orderId}`" class="detail_order ">
                        <div class="detail_table">
                            <!-- <table> -->
                                <div class="header_detail">
                                    <!-- number of item -->
                                    <div class="detail_number">
                                        <h6>
                                            #
                                        </h6>
                                    </div>
                                    <!-- SKU -->
                                    <div class="detail_sku">
                                        <h6>
                                            SKU
                                        </h6>
                                    </div>
                                    <!-- name -->
                                    <div class="detail_name">
                                        <h6>
                                            Name
                                        </h6>
                                    </div>
                                    <!-- price -->
                                    <div class="detail_price">
                                        <h6>
                                            Price
                                        </h6>
                                    </div>
                                    <!-- Qty -->
                                    <div class="detail_qty">
                                        <h6>
                                            Qty
                                        </h6>
                                    </div>
                                    <!-- Total -->
                                    <div class="detail_total">
                                        <h6>
                                            Total
                                        </h6>
                                    </div>
                                </div>
                                <!-- product item -->
                                <div v-for="(detail,indexDetail) of order.order_details" :key="indexDetail" class="product_item">
                                    <!-- img -->
                                    <div class="detail_product_number">
                                        <div>
                                            <img src="../../../assets/home_p/home_design_content_europe.png" alt="item_img">
                                        </div>
                                    </div>
                                    <!-- sku -->
                                    <div class="detail_product_sku">
                                        <h6>
                                            <!-- XX231asdasdf asdfasdf -->
                                            {{ detail.itemStyle }}
                                        </h6>
                                    </div>
                                    <!-- name -->
                                    <div class="detail_product_name">
                                        <div>
                                            <h6>
                                                {{ detail.itemname }}
                                            </h6>
                                            <p>
                                                {{ detail.itemStyle }} :
                                                {{ detail.itemSize }}
                                            </p>
                                        </div>

                                    </div>
                                    <!-- Price -->
                                    <div class="detail_product_price">
                                        <h6>
                                            ${{detail.priceEach}}
                                        </h6>
                                    </div>
                                    <!-- Qiy -->
                                    <div class="detail_product_qty">
                                        <h6>
                                            {{detail.qtyOrder}}
                                        </h6>
                                    </div>
                                    <!-- total -->
                                    <div class="detail_product_total">
                                        <h6>
                                            ${{detail.qtyOrder*detail.priceEach}}
                                        </h6>
                                    </div>
                                </div>
                                <!-- sumary -->
                                <div class="wrapper_summary">
                                    <div class="summary_list">
                                        <!--subtotal  -->
                                        <div class="summary_item">
                                            <h6>
                                                Subtotal
                                            </h6>
                                            <p class="money_bath">
                                                {{ order.total }}
                                            </p>
                                        </div>
                                        <!-- Shipping -->
                                        <div class="summary_item">
                                            <h6>
                                                Shiping
                                            </h6>
                                            <p class="money_bath">
                                                $0
                                            </p>
                                        </div>
                                        <!-- Tax -->
                                        <div class="summary_item">
                                            <h6>
                                                Tax
                                            </h6>
                                            <p class="money_bath">
                                                $0
                                            </p>
                                        </div>
                                    </div>
                                    <!-- total -->
                                    <div class="total">
                                        <h6>
                                            Total Payment
                                        </h6>
                                        <p class="money_bath">
                                            ${{order.total}}
                                        </p>
                                    </div>
                                </div>
                                    
                            <!-- </table> -->
                        </div>
                    
                    </div>
                
                </div>
            <!-- </table> -->
        </div>
        <!-- select page -->
        <div class="move_page">
            <p>
                Showing 
                <span>{{calculatePage.startWith}}</span> to 
                <span>{{calculatePage.endWith}}</span> of 
                <span>{{orderAmount}}</span> entries
            </p>
            <div>
                <button @click="previousPage()">
                    Previous
                </button>
                <button @click="nextPage()">
                    Next
                </button>
            </div>
        </div>
        <!-- pop up -->
        <div v-show="isChangeStatus" class="wrapper_confirm_change">
            <div class="confirm_change">
                <h5>
                    Do you want to change the order status?
                </h5>
                <div>
                    <button @click="confirmBank()">
                        Cancel
                    </button>
                    <button @click="confirmBank(true)">
                        Sure
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>   
</template>
<style scoped>
*{
    box-sizing: border-box;
}
.order_detail_off{
    display: none !important;
}
.order_detail_on{
    display: flex !important;
}
.wrapper_orders{
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
.orders{
    display: flex;
    width: 100%;
    height: inherit;
    flex-direction: column;
    gap: 24px;
}
.header_orders{
    display: flex;
    width: 100%;
    height: fit-content;
    /* position:relative; */
    justify-content: space-between;
    align-items: center;
}
.header_orders h4{
    font-size:18px;
    font-weight:500;
    color:#212121;
}

.header_orders >div{
    display: flex;
    position: relative;
    /* width: 168px; */
    width: 180px;
    height: 36px;
    /* gap: 4px; */
    justify-content: center;
    align-items: center;

    
}
.header_orders >div >button{
    display:flex;
    width:100%;
    height:100%;
    justify-content:start;
    align-items:center;
    gap:8px;
    border: none;
    border-radius: 4px;
    padding: 4px;
    background-color: #26AC34;
    cursor:pointer;
}
/* svg */
.header_orders >div >button >div{
    display:flex;
    width:20px;
    height:20px;
    justify-content:center;
    align-items:center;
}
.header_orders >div >button >div svg{
    width:15px;
    height:auto;
}
/* text */
.header_orders >div >button >h6{
    width:100%;
    height:fit-content;
    font-size:14px;
    font-weight:500;
    color:#fff;
    overflow:hidden;
    text-overflow:ellipsis;
    text-align:start;
    white-space:nowrap;
}

/* .header_orders button svg{
    
    width: 15px;
    height: auto;
    z-index: 15;
} */
/* .header_orders button svg:nth-child(1){
    
    position: absolute;
   bottom: 50%;
   top: 50%;
 left: 15px;
 top: 9px;
} */

/* .header_orders button input{
    display: flex;
    position: absolute;
    width: 100%;
    height: 100%;
    border: none;
    outline: 0;
    background-color: transparent;
    justify-content: center;
    align-items: center;
    color: #FFFFFF;
    font-size: 14px;
    font-weight: 500;
    margin: auto;

} */
/* .header_orders button input::selection{
    color: red;
    background-color: red;
} */
/* .header_orders button input[type="date"]::-webkit-calendar-picker-indicator{
    display: flex;
    position: absolute;
    width: 50px;
    height: 50px;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    height: 100%;
    width: 100%;
    justify-content: center;
    background: transparent;
    background-color: gray;
    color: gray;
    cursor: pointer;
    z-index: 20;
} */
/* drop down */
#date_range_drop{
    display:flex;
    width:180px;
    height:fit-content;
    position:absolute;
    flex-direction:column;
    gap:4px;
    bottom:-120px;
    right:0;
    background-color:#fff;
    box-shadow: 0px 10px 15px -3px #0000001A;
    border:none;
    border-radius:8px;
    padding:4px;

}
#date_range_drop >label{
    display:flex;
    width:100%;
    height:fit-content;
    align-items:center;
    justify-content:center;
    gap:4px;
    cursor:pointer;
    padding:4px;
}
#date_range_drop >label h6{
    width:36px;
    height:fit-content;
    font-size:14px;
    font-weight:400;
    color:#9E9E9E;
    text-align:start;
}
#date_range_drop >label input{
    width:120px;
    height:fit-content;
    padding:4px;
    border:none;
}
#date_range_drop >div{
    display:flex;
    width:100%;
    height:fit-content;
    gap:4px;
}
#date_range_drop >div button{
    display:flex;
    width:100%;
    height:36px;
    border:none;
    border-radius:4px;
    justify-content:center;
    align-items:center;
    font-size:14px;
    font-weight:400;
    cursor:pointer;
}
/* reset */
.reset_date{
    color:#212121;
    /* border:1px solid; */
    /* border-color:#E0E0E0; */
    background-color:#E0E0E0;
    box-shadow: 0px 1px 2px 0px #0000000D;

}
/* submit */
.submit_date{
    color:#fff;
    background-color:#26AC34;
    box-shadow: 0px 1px 2px 0px #0000000D;

}

.sort_orders{
    width: 100%;
    height: fit-content;
    overflow-x: auto;
    border-bottom: 1px solid;
    border-color: #E0E0E0;
}
.sort_list{
    display: flex;
    width: fit-content;
    height: fit-content;
    gap: 32px;
}
.sort_item{
    display: flex;
    width: fit-content;
    height: 38px;
    justify-content: center;
    align-items: start;
    border: none;
    /* border-bottom: 1px solid; */
    /* border-color: #E0E0E0; #168A22 */
    padding: 0px 4px 16px 4px;
    cursor: pointer;
    
    color: #212121; /*#168A22 */
    background-color: #fff;
    gap: 8px;
}
.sort_item h4{
    font-weight: 500;
    font-size: 14px;
}
.sort_item p{
    width: fit-content;
    height: 20px;
    padding: 2px 10px;
    font-weight:500 ;
    font-size: 12px;
    background-color: #F5F5F5;
    border-radius: 50%;
}
/* active */
.sort_list .sort_item_active{
    color:#168A22;
    border-bottom: 1px solid;
    border-color: #168A22;
}
.sort_list .sort_item_active p{
    background-color:#EEFFF0;
    color:#168A22;
}
/* orders list */
.content_orders{
    display: flex;
    width: 100%;
    height: fit-content;
    max-height: 100%;
    overflow: auto;
    flex-direction: column;
}
.content_orders .title_orders{
    table-layout: fixed;
    width: 100%;
    height: fit-content;
    border-collapse: collapse;
    
}
.title_orders{
    display: flex;
    width: 100%;
    height: 28px;
    vertical-align: top;
    text-align: start;
    border-bottom: 1px solid #E0E0E0;
    font-size: 12px;
    font-weight: 500;
    color: #757575;
    border-bottom: 1px solid #E0E0E0;
    white-space: nowrap;
}
.title_orders >div h5{
    width: 100%;
    height: 100%;
}
/* number of order */
.order_number{
    width: 32px;
    min-width: 32px;
    max-width: 100%;
}
/* empty */
.order_empty{
    width: 44px;
    min-width: 44px;
    max-width: 100%;
}
/* order id */
.order_id{
    width: 84px;
    min-width: 84px;
    max-width: 100%;
}
/* customer */
.order_customer{
    width: 140px;
    min-width: 140px;
    max-width: 100%;
}
/* address */
.order_address{
    width: 264px;
    min-width: 264px;
    max-width: 100%;
}
/* date */
.order_date,
.order_price,
.order_status{
    width: 108px;
    min-width: 108px;
    max-width: 100%;
}

.title_orders > div button{
    display: flex;
    width: 100%;
    height: 28px;
    padding: 0px 12px;
    border: none;
    background-color: transparent;
    justify-content: start;
    align-items: start; 
    cursor: pointer;
}
.title_orders > div button h5,.header th h5{
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
.title_orders > div button svg{
    display: flex;
    width: 12px;
    height: 12px;
    justify-content: center;
    align-items: center;
}
/* order item */
.wrapper_order_item{
    display: flex;
    width: 100%;
    height: fit-content;
    flex-direction: column
}
.order_item{
    display: flex;
    width: fit-content;
    height: 52px;
    max-height: fit-content;
}
.order_item > div{
    display: flex;

}
.order_item h6,.order_item p,
.order_item > div 
{
    
    color: #212121;
    font-weight: 400;
    font-size: 14px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}
/* order item */
.order_item div:nth-child(1) h6{
    width: 100%;
    padding: 16px 12px 16px 0px;
}
/* detail button */
.order_item div:nth-child(2) button{
    width: 100%;
    border: none;
    background-color: transparent;
    cursor: pointer;
}
.order_item div:nth-child(2) button svg{
    width: 6px;
    height: auto
}

/* status button */
/* .order_item div:nth-child(8){
} */
.order_item div:nth-child(8)> div{
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    position: relative;
    /* padding: 12px 0px 12px 12px; */
    
}
.order_item div:nth-child(8)> div> select{
    display: flex;
    width: fit-content;
    min-width: 96px;
    height: 24px;
    padding: 4px;
    gap: 4px;
    border: none;
    border-radius: 8px;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background-color:#EEEEEE;
}
/* .order_item div:nth-child(8)> div> select:focus{
    outline: none;
} */
/* .order_item div:nth-child(8)> div > button svg{
    width: 8px;
    height: auto;
} */
/* drop down  */

.order_item div:nth-child(8)> div > div{
    display: none; 
    width:96px;
    height:fit-content;
    position: absolute;
    bottom: 0;
    left: 0;
    background-color:red;
    flex-direction: column;
    padding: 4px;
    justify-content: center;
    gap: 4px;
    overflow-y: auto;
    z-index: 999;
}
.order_item div:nth-child(8)> div > div >button{
    background-color: green;
    cursor: pointer;
}
.order_item div:nth-child(8)> div >.drop_down_active{
    display: flex;
}
/* .order_item th:nth-child(8) */
.padding_info{
    padding: 16px 12px;
}
/* detail */
.detail_order{
    
    display: none;
    width: 100%;
    height: fit-content;
    /* column-span: 8; */
    padding: 0px 0px 0px 76px;
}
.detail_table{
    display: flex;
    width: 100%;
    height: 100%;
    padding-top: 16px;
    padding-bottom: 12px;

    flex-direction: column;
}
.product_item{
    display: flex;
    width: 100%;
    height: 64px;
}
.product_item >div{
    display: flex;
    height: 52px;
    margin-top: 12px;
}
/*  title of product detail list*/
.header_detail{
    display: flex;
    height: fit-content;
    border-bottom: 1px solid;
    border-color: #E0E0E0;
}
/* all product */
.header_detail > div{
    height: 28px;
    color: #757575;
}
.header_detail >div h6{
    font-size: 12px;
    font-weight: 500;
}

/* order product */
.detail_number{
    width: 52px;
    min-width:  52px;
    max-width: 100%;
}
.detail_product_number div{
    display: flex;
    width: 52px;
    height: 52px;
    border: none;
    border-radius: 4px;
    overflow: hidden
}
.detail_product_number div img{
    width: 100%;
    height: auto;
}

/* sku */
.detail_sku{
    width: 100px;
    min-width: 100px;
    max-width: 100%;
}
.detail_product_sku{
    display: flex;
    width: 100px;
    max-width: 100%;
    padding: 16px 12px;
}
.detail_product_sku h6{
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 14px;
    font-weight: 500;
    color: #212121;
}
/* name */
.detail_name{
    width: 324px;
    min-width: 324px;
    max-width: 100%;
}
.detail_product_name{
    display: flex;
    width: 324px;
    max-width: 100%;
    padding: 6px 12px;
}
.detail_product_name div{
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
}
.detail_product_name div h6{
    width: 100%;
    height: 20px;
    font-size: 14px;
    font-weight: 500;
    color: #212121;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    
}
.detail_product_name div p{
    width: 100%;
    height: 16px;
    font-size: 12px;
    font-weight: 400;
    color: #616161;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
/* price */
.detail_price{
    width: 108px;
    min-width: 108px;
    max-width: 100%;
}
.detail_product_price{
    display: flex;
    width: 108px;
    max-width: 100%;
    padding: 16px 12px;
}
.detail_product_price h6{
    width: 100%;
    height: 20px;
    font-size: 14px;
    font-weight: 400;
    color:#212121;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
/* qty */
.detail_qty{
    width: 108px;
    min-width: 108px;
    max-width: 100%;
}
.detail_product_qty{
    display: flex;
    width: 108px;
    max-width: 100%;
    padding: 16px 12px;
}
.detail_product_qty h6{
    width: 100%;
    height: 20px;
    font-size: 14px;
    font-weight: 400;
    color:#212121;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
/* total */
.detail_total{
    width: 108px;
    min-width: 108px;
    max-width: 100%;
}
.detail_product_total{
    display: flex;
    width: 108px;
    max-width: 100%;
    padding: 16px 12px;
}
.detail_product_total h6{
    width: 100%;
    height: 20px;
    font-size: 14px;
    font-weight: 400;
    color:#212121;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
/* summary */
.wrapper_summary{
    display: flex;
    width: fit-content;
    height: fit-content;
    flex-direction: column;
    padding: 12px 0px 12px 488px;
    border-top: 1px solid;
    border-color: #EEEEEE;
    gap: 4px;
}
.summary_list{
    display: flex;
    width: 312px;
    height: fit-content;
    flex-direction: column;
    gap: 4px
}
.summary_list div{
    display: flex;
    width: 100%;
    height: 20px;
    justify-content: space-between;
    align-items: center;
}
.summary_list div h6{
    width: fit-content;
    max-width: 100%;
    font-size: 14px;
    font-weight: 400;
    color: #616161;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.summary_list div p{
    width: 108px;
    max-width: 100%;
    height: 100%;
    font-size: 14px;
    font-weight: 400;
    color: #212121;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.money_bath::before{
    font-size: inherit;
    font-weight: inherit;
    content: '฿'
}
.total{
    display: flex;
    width: 100%;
    height: 32px;
    padding-top: 12px;
    justify-content: space-between;
    align-items: center;
}
.total h6{
    width: fit-content;
    max-width: 100%;
    height: 20px;
    font-size: 14px;
    font-weight: 700;
    color: #212121;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.total p{
    width: 108px;
    max-width: 100%;
    height: 100%;
    font-size: 14px;
    font-weight: 700;
    color: #212121;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.move_page{
    display: flex;
    width: 100%;
    height: fit-content;
    justify-content: space-between;
    align-items: center;
    
}
.move_page p{
    width: fit-content;
    height: 20px;
    font-size: 14px;
    font-weight: 400;
    
}
.move_page p span{
    font-weight: 500 ; 
    color: #374151;
}
.move_page div{
    display: flex;
    width: fit-content;
    height: 36px;
    gap: 12px;
}
.move_page div button{
    display: flex;
    width: fit-content;
    height: 100%;
    padding: 8px 12px;
    border: 1px solid;
    border-color: #E0E0E0;
    background-color: #fff;
    border-radius: 4px;
    cursor: pointer;
    justify-content: center;
    align-items: center;
}

/* confirm */
.wrapper_confirm_change {
    display: flex;
    position: fixed;
    width: 100%;
    height: 100dvh;
    background-color: #00000040;
    top: 0;
    left: 0;
    z-index: 999;
    /* opacity: 25%; */
    justify-content: center;
    align-items: center;
}

.confirm_change {
    display: flex;
    width: 448px;
    height: 148px;
    flex-direction: column;
    background-color: #fff;
    padding: 32px 40px;
    border-radius: 8px;
    gap: 24px;
}

.confirm_change h5 {
    display: flex;
    width: 100%;
    height: 24px;
    font-size: 16px;
    font-weight: 500;
    /* text-align: center; */
    justify-content: center;
    align-items: center;
}

.confirm_change div {
    display: flex;
    width: 100%;
    height: fit-content;
    gap: 8px;
    justify-content: center;
    align-items: center;
}

.confirm_change div button {
    display: flex;
    width: 80px;
    height: 36px;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    padding: 8px 12px;
    box-shadow: 0px 1px 2px 0px #0000000D;
    cursor: pointer;
}

.confirm_change div button:nth-child(1) {
    border: 1px solid;
    border-color: #E0E0E0;
    background-color: #fff;
    color: #212121;

}

.confirm_change div button:nth-child(2) {
    background-color: #26AC34;
    color: #fff;
    border: none;
}
</style>
