<script setup>
const props=defineProps({
    name:{
        type:String,
        default:'',
        required:true
    },
    show:{
        type:Boolean,
        default:true
    },
    msg:{
        type:String,
        default:''
    }
})
</script>
<template>
    <!-- worning -->
    <div :id="props.name" v-show="props.show" class="wrapper_errorMsg">
        <div>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M1.5 8.99951C1.5 4.86026 4.86 1.49951 9 1.49951C13.1475 1.49951 16.5 4.86026 16.5 8.99951C16.5 13.1403 13.1475 16.4995 9 16.4995C4.86 16.4995 1.5 13.1403 1.5 8.99951ZM8.34 6.15701C8.34 5.79776 8.64 5.49701 9 5.49701C9.36 5.49701 9.6525 5.79776 9.6525 6.15701V9.47201C9.6525 9.83276 9.36 10.1245 9 10.1245C8.64 10.1245 8.34 9.83276 8.34 9.47201V6.15701ZM9.0075 12.5103C8.64 12.5103 8.3475 12.2103 8.3475 11.8503C8.3475 11.4903 8.64 11.1978 9 11.1978C9.3675 11.1978 9.66 11.4903 9.66 11.8503C9.66 12.2103 9.3675 12.5103 9.0075 12.5103Z"
                    fill="#F75555" />
            </svg>
            <p>
                {{ props.msg }}
            </p>
        </div>
    </div>
</template>
<style scoped>
*{
    box-sizing: border-box;
}
.wrapper_errorMsg {
    display: flex;
    width: 100%;
    height: fit-content;
    flex-direction: column;
    padding: min(0.556dvw, 8px) min(0.833dvw, 12px);
    font-size: min(0.833dvw, 12px);
    border-radius: min(0.278dvw, 4px);
    background-color: rgba(245, 72, 74, 0.08);
    gap: min(0.556dvw, 8px)
}

.wrapper_errorMsg div {
    display: flex;
    width: 100%;
    height: fit-content;
    gap: min(0.278dvw, 4px);
}

.wrapper_errorMsg div svg {
    width: min(1.042dvw, 15px);
    height: min(1.042dvw, 15px);
}

.wrapper_errorMsg div p {
    width: 100%;
    font-size: min(0.833dvw, 12px);
    font-style: normal;
    font-weight: 400;
    line-height: 136%;
    /* 16.32px */
    letter-spacing: 0.2px;
    color: #F75555;
    overflow: hidden;
    text-overflow: ellipsis;
}

@media (width<=432px){

    .wrapper_errorMsg {
        display: flex;
        width: 100%;
        height: fit-content;
        flex-direction: column;
        padding: min(1.852dvw,8px) min(2.778dvw,12px);
        font-size:  min(2.778dvw,12px);
        border-radius: min(0.926dvw,4px);
        gap: min(1.852dvw,8px);
    }
    .wrapper_errorMsg div {
        gap: min(0.926dvw,4px);
    }
    .wrapper_errorMsg div svg {
        width: min(3.472dvw,15px);
        height: min(3.472dvw,15px);
    }
    .wrapper_errorMsg div p {
        font-size: min(2.778dvw,12px);
    }



}

</style>