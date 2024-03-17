<script setup>
import { computed, onBeforeMount, onMounted, onUpdated } from 'vue';
const props = defineProps({
    description: {
        type: String,
        required: true,
        default: ""
    }
})
const text =`Polyscias are versatile, small, indoor, branching trees. They grow in a compact, upright manner, making them suitable even in smaller spaces. Their thick, woody trunks are their main appeal. Each plant is unique as the large, rounded leaves can develop anywhere along the length of the branches, exposing different degrees of woody stem on each plant. They are often called Dinner Plate Aralia due to their round, flat leaf shape. Polyscias translates from the Greek as "many"" and ""shade"", a reference to their abundant foliage.\n\nPolyscias Scutellaria Fabian has large, scalloped, dark green, glossy leaves that curve outwards slightly. They are deeply veined and tinged purple underneath."`
// onMounted(()=>{
    // haiku.replace(/\n/g, "<br />")
//    console.log(typeof(text))
//    console.log(props.description.replace(/\n/g, "<br />"))
// document.getElementById('content').innerHTML=``+props.description
// })

</script>
<template>
    <div v-show="description.length" class="wrapper_description">
        <h5>
            Product Description
        </h5>
        <!-- for show content long text -->
        <div class="description">
            <!-- <p>
                Polyscias are versatile, small, indoor, branching trees. They grow in a compact, upright manner, making them suitable even in smaller spaces. Their thick, woody trunks are their main appeal. Each plant is unique as the large, rounded leaves can develop anywhere along the length of the branches, exposing different degrees of woody stem on each plant. They are often called Dinner Plate Aralia due to their round, flat leaf shape. Polyscias translates from the Greek as "many" and "shade", a reference to their abundant foliage.
            </p>
            <br>
            <p>
                Polyscias Scutellaria Fabian has large, scalloped, dark green, glossy leaves that curve outwards slightly. They are deeply veined and tinged purple underneath.
            </p> -->
            <div id="content"  >
                {{text}}
            </div>
        </div>
    </div>
</template>
<style scoped>
.wrapper_description{
    display: flex;
    width: 100%;
    height: fit-content;
    padding: min(1.389dvw, 20px);
    background-color: #fff;
    border-radius: min(0.556dvw, 8px);
    gap: min(0.833dvw, 12px);
    flex-direction: column;
    color: #212121;
}
.wrapper_description h5 {
    font-size: min(1.389dvw, 20px);
    line-height: 160%;
}
.description div{
    font-size: min(0.972dvw, 14px);
    letter-spacing: min(0.014dvw, 0.2px);
    word-break: normal;
    white-space: pre-line
}

</style>