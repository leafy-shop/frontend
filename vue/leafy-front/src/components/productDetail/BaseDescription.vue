<script setup>

let props = defineProps({
    description: {
        type: String,
        required: true,
        default: ""
    }
})

</script>
<template>
    <div class="wrapper_description">
        <h5>
            Product Description
        </h5>
        <!-- for show content long text -->
        <div>
            <!-- <p>
                Polyscias are versatile, small, indoor, branching trees. They grow in a compact, upright manner, making them suitable even in smaller spaces. Their thick, woody trunks are their main appeal. Each plant is unique as the large, rounded leaves can develop anywhere along the length of the branches, exposing different degrees of woody stem on each plant. They are often called Dinner Plate Aralia due to their round, flat leaf shape. Polyscias translates from the Greek as "many" and "shade", a reference to their abundant foliage.
            </p>
            <br>
            <p>
                Polyscias Scutellaria Fabian has large, scalloped, dark green, glossy leaves that curve outwards slightly. They are deeply veined and tinged purple underneath.
            </p> -->
            <p>
                {{ description }}
            </p>
        </div>
    </div>
</template>
<style scoped>
.wrapper_description{
    width: 1120px;
    height: fit-content;
    padding: 20px;
}
</style>