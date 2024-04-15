<script setup>
import{ref} from 'vue'
const props=defineProps({
    name:{
        type:String,
        required:true
    },
    total:{
        type:Number,
        default:0
    },
    shipping:{
        type:Number,
        default:0
    },
    tax:{
        type:Number,
        default:0
    },
    summaryTotal:{
        type:Number,
        default:0
    },
    countCheckOut:{
        type:Number,
        default:0
    }
})
</script>
<template>
    <!-- summary -->
    <div class="wrapper_summary" :id="props.name">
        <div class="summary">
          <!-- header -->
          <h4>Order Summary</h4>
          <!-- summary list -->
          <div class="summary_list">
            <!--subtotal  -->
            <div class="summary_item">
              <h6>Subtotal</h6>
              <p class="money_bath">{{ props.total }}</p>
            </div>
            <!-- Shipping -->
            <div class="summary_item">
              <h6>Shiping</h6>
              <p class="money_bath">{{ props.shipping }}</p>
            </div>
            <!-- Tax -->
            <div class="summary_item">
              <h6>Tax</h6>
              <p class="money_bath">{{ props.tax }}</p>
            </div>
          </div>
          <!-- total -->
          <div class="total">
            <h6>Total Payment</h6>
            <p class="money_bath">
              {{props.summaryTotal}}
            </p>
          </div>
        </div>
        <!-- submit -->
        <button @click="$emit('submit')">
            <span v-if="props.name=='summary_cart'">
                Check Out ({{ countCheckOut }})
            </span>
            <span v-else>
                Place Order
            </span>
        </button>
    </div>
</template>
<style scoped>
*{
    box-sizing: border-box;
}
.wrapper_summary {
  display: flex;
  width: 100%;
  height: fit-content;
  border-radius: min(0.556dvw,8px);
  padding: min(0.833dvw,12px) min(1.389dvw,20px);
  flex-direction: column;
  background-color: #fff;
  justify-content: start;
  align-items: center;
  gap: min(0.833dvw,12px);
}

.summary {
  display: flex;
  width: 100%;
  height: fit-content;
  flex-direction: column;
  gap: min(0.833dvw,12px);
}

.summary h4 {
  display: flex;
  width: 100%;
  height: min(1.667dvw,24px);
  font-weight: 700;
  font-size: min(1.111dvw,16px);
  color: #212121;
  align-items: center;
  justify-content: start;
}

.summary_list {
  display: flex;
  width: 100%;
  height: fit-content;
  flex-direction: column;
  gap: min(0.278dvw,4px);
}

.summary_list .summary_item {
  display: flex;
  width: 100%;
  height: min(1.389dvw,20px);
  justify-content: space-between;
}

.summary_item h6 {
  /* display: flex; */
  width: 100%;
  height: 100%;
  font-size: min(0.972dvw,14px);
  font-weight: 400;
  color: #616161;
}

.summary_item p {
  width: 108px;
  height: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: min(0.972dvw,14px);
  font-weight: 400;
  color: #212121;
  text-align: end;
}
.money_bath::before{
    content: "฿";
}
.total {
  display: flex;
  width: 100%;
  height: min(2.222dvw,32px);
  padding-top: min(0.833dvw,12px);
  border-top: min(0.069dvw,1px) solid;
  border-color: #eeeeee;
  justify-content: space-between;
  align-items: center;
  /* flex-direction: column; */
}

.total h6 {
  width: fit-content;
  height: fit-content;
  font-size: min(0.972dvw,14px);
  font-weight: 700;
  color: #212121;
}

.total p {
  width: min(7.5dvw,108px);
  height: 100%;
  font-size: min(0.972dvw,14px);
  font-weight: 700;
  text-align: end;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #26ac34;
}

.wrapper_summary > button {
  display: flex;
  width: 100%;
  height: min(3.611dvw,52px);
  border: none;
  border-radius: min(0.278dvw,4px);
  padding: min(0.278dvw,4px);
  background-color: #26ac34;
  box-shadow: 0px min(0.069dvw,1px) min(0.139dvw,2px) 0px #0000000d;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  font-size: min(1.25dvw,18px);
  font-weight: 500;
  color: #fff;
}
</style>