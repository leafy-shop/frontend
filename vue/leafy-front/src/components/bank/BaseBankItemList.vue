<script setup>
import{ref,computed} from 'vue'
import bankTypeList from '../../JS/enum/bankAccount'
// const emit=defineEmits(["setDefaultBank","fullNameBank","showConfirm","goUpdate"])
const props=defineProps({
    dataList:{
        type:Array,
        // default:[],
        required:true
    },
    name:{
        type:String,
        default:'',
        required:true
    },
    isDefault:{
        type:Boolean,
        default:false,
        // required:true
    },
    showEditBtn:{
        type:Boolean,
        default:true,
    },
    showDefaultIcon:{
        type:Boolean,
        default:true
    }
    // fullNameBank:{
    //     type:Function,
    //     required:true,
    //     // default:''
    //     // required:true
    // }
})
const isDefaultData=computed(()=>props.isDefault)
const isShowEditBtn=computed(()=>props.showEditBtn)
const isShowDefaultIcon=computed(()=>props.showDefaultIcon)
const dataList=computed(()=>{
    if(props.dataList==undefined||props.dataList[0]==undefined){
        return []
    }else{
        // console.log('this is default',props.dataList)
        // console.log('this is default',Object.keys([props.dataList]))
        
        return props.dataList
    }
})
const fullNameBank = (keyword) => {
    //find keyword match to data then find index of that information
    let index = bankTypeList.map((x) => x.value == keyword).indexOf(true)
    // console.log(index)
    if (index != -1) return bankTypeList[index].name;
}
</script>
<template>
    <div v-if="dataList.length!=0" class="container_bank" :id="props.name">
        <!-- bank -->
        <div  v-if="name.includes('bank')" class="bank_list">
            <div v-for="(data,index) of props.dataList" :key="`data_${props.name}`" class="bank_item">
                <!-- title -->
                <div class="title">
                    <div class="info">
                        <h5>
                            {{ data.bankname }}
                        </h5>
                        <p>
                            {{ data.bankAccount }}
                        </p>
                    </div>

                    <div class="operation">

                        <!-- edit -->
                        
                        <button v-if="isShowEditBtn" @click="$emit('goUpdate',data.paymentId)">
                            <!-- {{ isShowEditBtn }} -->
                            <svg width="17" height="17" viewBox="0 0 17 17" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M7.16671 3.16664H3.00004C2.55801 3.16664 2.13409 3.34223 1.82153 3.65479C1.50897 3.96736 1.33337 4.39128 1.33337 4.83331V14C1.33337 14.442 1.50897 14.8659 1.82153 15.1785C2.13409 15.491 2.55801 15.6666 3.00004 15.6666H12.1667C12.6087 15.6666 13.0327 15.491 13.3452 15.1785C13.6578 14.8659 13.8334 14.442 13.8334 14V9.83331M12.655 1.98831C12.8088 1.82912 12.9927 1.70215 13.196 1.6148C13.3994 1.52746 13.6181 1.48148 13.8394 1.47956C14.0607 1.47763 14.2801 1.5198 14.485 1.6036C14.6898 1.6874 14.8759 1.81116 15.0324 1.96765C15.1889 2.12414 15.3126 2.31022 15.3964 2.51505C15.4802 2.71988 15.5224 2.93934 15.5205 3.16064C15.5185 3.38194 15.4726 3.60064 15.3852 3.80398C15.2979 4.00732 15.1709 4.19123 15.0117 4.34497L7.85671 11.5H5.50004V9.14331L12.655 1.98831Z"
                                    stroke="#9E9E9E" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" />
                            </svg>
                        </button>
                        <!-- bin -->
                        <button  v-if="!isDefaultData" @click="$emit('showConfirm',data.paymentId)">
                            <svg width="16" height="18" viewBox="0 0 16 18" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M6.33337 8.16667V13.1667M9.66671 8.16667V13.1667M1.33337 4.83333H14.6667M13.8334 4.83333L13.1109 14.9517C13.0809 15.3722 12.8928 15.7657 12.5843 16.053C12.2758 16.3403 11.8699 16.5 11.4484 16.5H4.55171C4.13016 16.5 3.72426 16.3403 3.41578 16.053C3.10729 15.7657 2.91914 15.3722 2.88921 14.9517L2.16671 4.83333H13.8334ZM10.5 4.83333V2.33333C10.5 2.11232 10.4122 1.90036 10.256 1.74408C10.0997 1.5878 9.88772 1.5 9.66671 1.5H6.33337C6.11236 1.5 5.9004 1.5878 5.74412 1.74408C5.58784 1.90036 5.50004 2.11232 5.50004 2.33333V4.83333H10.5Z"
                                    stroke="#9E9E9E" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" />
                            </svg>
                        </button>    
                    </div>
                </div>
                <!-- discription -->
                <div class="discription">
                    <p >
                        {{fullNameBank(data.bankCode) }}
                    </p>
                    
                    <!-- set default -->
                    <button v-if="!isDefaultData" @click="$emit('setDefaultBank',data.paymentId)">
                        Set as default
                    </button>

                </div>
                <!-- default -->
                <div v-if="isDefaultData&&isShowDefaultIcon" class="default_icon"  >
                    Default
                </div>

            <!-- <button @click="setDefaultBank(bank.paymentId)">Set as default</button> -->
            <!-- <button v-show="bank.isDefault" disabled>Default</button> -->
            </div>
        </div>

        <!-- address -->
        <div v-else  class="bank_list">
            <div v-for="(data,index) of props.dataList" :key="`data_${props.name}`" class="bank_item">
                <!-- title -->
                <div class="title">
                    <div class="info">
                        <h5>
                            {{ data.addressname }}
                        </h5>
                        <p>
                            {{ data.phone }}
                        </p>
                    </div>

                    <div class="operation">

                        <!-- edit -->
                        <button v-if="isShowEditBtn" @click="$emit('goUpdate',data.addressId)">
                            <svg width="17" height="17" viewBox="0 0 17 17" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M7.16671 3.16664H3.00004C2.55801 3.16664 2.13409 3.34223 1.82153 3.65479C1.50897 3.96736 1.33337 4.39128 1.33337 4.83331V14C1.33337 14.442 1.50897 14.8659 1.82153 15.1785C2.13409 15.491 2.55801 15.6666 3.00004 15.6666H12.1667C12.6087 15.6666 13.0327 15.491 13.3452 15.1785C13.6578 14.8659 13.8334 14.442 13.8334 14V9.83331M12.655 1.98831C12.8088 1.82912 12.9927 1.70215 13.196 1.6148C13.3994 1.52746 13.6181 1.48148 13.8394 1.47956C14.0607 1.47763 14.2801 1.5198 14.485 1.6036C14.6898 1.6874 14.8759 1.81116 15.0324 1.96765C15.1889 2.12414 15.3126 2.31022 15.3964 2.51505C15.4802 2.71988 15.5224 2.93934 15.5205 3.16064C15.5185 3.38194 15.4726 3.60064 15.3852 3.80398C15.2979 4.00732 15.1709 4.19123 15.0117 4.34497L7.85671 11.5H5.50004V9.14331L12.655 1.98831Z"
                                    stroke="#9E9E9E" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" />
                            </svg>

                        </button>
                        <!-- bin -->
                        <button  v-if="!isDefaultData" @click="$emit('showConfirm',data.addressId)">
                            <svg width="16" height="18" viewBox="0 0 16 18" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M6.33337 8.16667V13.1667M9.66671 8.16667V13.1667M1.33337 4.83333H14.6667M13.8334 4.83333L13.1109 14.9517C13.0809 15.3722 12.8928 15.7657 12.5843 16.053C12.2758 16.3403 11.8699 16.5 11.4484 16.5H4.55171C4.13016 16.5 3.72426 16.3403 3.41578 16.053C3.10729 15.7657 2.91914 15.3722 2.88921 14.9517L2.16671 4.83333H13.8334ZM10.5 4.83333V2.33333C10.5 2.11232 10.4122 1.90036 10.256 1.74408C10.0997 1.5878 9.88772 1.5 9.66671 1.5H6.33337C6.11236 1.5 5.9004 1.5878 5.74412 1.74408C5.58784 1.90036 5.50004 2.11232 5.50004 2.33333V4.83333H10.5Z"
                                    stroke="#9E9E9E" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" />
                            </svg>
                        </button>    
                    </div>
                </div>
                <!-- discription -->
                <div class="discription">
                    <p >
                        {{ 
                        `${data.address}  ${data.province}  ${data.distrinct}
                        ${data.subDistrinct}  ${data.postalCode}`
                        }}
                    </p>
                    
                    <!-- set default -->
                    <button v-if="!isDefaultData" @click="$emit('setDefaultAddress',data.addressId)">
                        Set as default
                    </button>

                </div>
                <!-- default -->
                <div v-if="isDefaultData&&isShowDefaultIcon" class="default_icon"  >
                    Default
                </div>

            <!-- <button @click="setDefaultBank(bank.paymentId)">Set as default</button> -->
            <!-- <button v-show="bank.isDefault" disabled>Default</button> -->
            </div>
        </div>
    </div>
</template>
<style scoped>
*{
    box-sizing: border-box;
}
.container_bank {
    display: flex;
    width: 100%;
    height: fit-content;
    justify-content: center;
    align-items: start;
    
}

.bank_list {
    display: flex;
    width: 100%;
    height: fit-content;
    flex-direction: column;
    gap: 12px;
}

.bank_item {
    display: flex;
    width: 100%;
    /* height: 92px; */
    height: fit-content;
    flex-direction: column;
    /* padding-top: 24px; */
    border-top: v-bind('isShowEditBtn==true?'1px solid':'none'')  ;
    border-color: #E0E0E0;
    justify-content: end;
    padding-top: v-bind('isShowEditBtn==true?'12px':'none'');
    gap: 4px;
}

.title {
    display: flex;
    width: inherit;
    height: 24px;
    justify-content: space-between;
    align-items: center;
}

.title .info {
    display: flex;
    width: fit-content;
    height: inherit;
    gap: 8px;
    align-items: center;
}

.info h5 {
    width: 100%;
    max-width: 300px;
    height: fit-content;
    font-size: 16px;
    font-weight: 500;
    color: #212121;
    padding-right: 8px;
    border-right: 1px solid;
    border-color: #E0E0E0;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}

.info p {
    font-size: 14px;
    font-weight: 400;
    color: #616161;

}

.title .operation {
    display: flex;
    width: 48px;
    height: inherit;
    gap: 8px;
    justify-content: center;
    align-items: center;
}

.operation button {
    display: flex;
    width: 20px;
    height: 20px;
    border: none;
    background-color: #fff;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}
.bank_item .discription{
    display: flex;
    width: 100%;
    min-width: fit-content;
    height: fit-content;
    justify-content: space-between;
}
.discription p {
    display: flex;
    width: 540px;
    height: fit-content;
    font-weight: 400;
    font-size: 14px;
    color: #616161;
    /* text-overflow: ellipsis; */
}
.discription button{
    display: flex;
    width: 103px;
    height: 24px;
    justify-content: center;
    align-items: center;
    border: 1px solid;
    padding: 4px 12px;
    border-color: #E0E0E0;
    background-color: #fff;
    box-shadow: 0px 1px 2px 0px #0000000D;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 500;
    color: #212121;
    cursor: pointer;
}
.default_icon{
    display: flex;
    width: 59px;
    height: 20px;
    padding: 4px 12px;
    justify-content: center;
    align-items: center;
    border: 1px solid;
    border-radius: 4px;
    border-color: #26AC34;
    color: #26AC34;
    box-shadow: 0px 1px 2px 0px #0000000D;
    font-size: 10px;
    font-weight: 500;
}

</style>