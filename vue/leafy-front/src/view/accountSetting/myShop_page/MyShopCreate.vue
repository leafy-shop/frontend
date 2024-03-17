<script setup>
import {ref} from 'vue'


const productStyleList=ref([
    // initial
])

const addStyle=()=>{
    let styleObj={name:'',price:'',stock:'',color:'',size:'',img:''}

    productStyleList.value.push(styleObj)
}
</script>
<template>
<div class="wrapper_shop">
    <!-- add new product -->
    <div class="wrapper_shop_create">
        <div class="shop_create">
            <!-- header -->
            <div class="header_shop_create">
                <h4>
                    Add New Product
                </h4>
            </div>
            <!-- container input -->
            <div class="container_input">
                <!-- name -->
                <div class="input_field">
                    <h5>
                        Name
                    </h5>
                    <input class="input" type="text">
                </div>
                <!-- description -->
                <div class="input_field">
                    <h5>
                        Description
                    </h5>
                    <textarea class="input_description" placeholder="Something about product."></textarea>
                </div>
                <!-- cover photo -->
                <div class="input_field">
                    <h5>
                        Cover Photo
                    </h5>
                    <!-- <div class="input_img">
                        

                    </div> -->
                    <div class="input_img">
                        <input @change="uploadCoverImage"  id="cover_image" type="file" accept="image/*">
                        <label  for="cover_image">
                            <div>
                                <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21 5H5C3.93913 5 2.92172 5.42143 2.17157 6.17157C1.42143 6.92172 1 7.93913 1 9V29M1 29V33C1 34.0609 1.42143 35.0783 2.17157 35.8284C2.92172 36.5786 3.93913 37 5 37H29C30.0609 37 31.0783 36.5786 31.8284 35.8284C32.5786 35.0783 33 34.0609 33 33V25M1 29L10.172 19.828C10.9221 19.0781 11.9393 18.6569 13 18.6569C14.0607 18.6569 15.0779 19.0781 15.828 19.828L21 25M33 17V25M33 25L29.828 21.828C29.0779 21.0781 28.0607 20.6569 27 20.6569C25.9393 20.6569 24.9221 21.0781 24.172 21.828L21 25M21 25L25 29M29 5H37M33 1V9M21 13H21.02" stroke="#BDBDBD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>                            
                            </div>
    
                            <h6 >
                            <span>
                                Upload a file
                            </span> or drag and drop
                            </h6>
                            <p >
                                PNG or JPG up to 10MB
                            </p>
                            
                        </label>
                        
                    </div>
                </div>
                <div class="input_list">
                    <!-- category -->
                    <div class="input_field">
                        <h5>
                            Category
                        </h5>
                        <select class="input" name="" id="">
                            <option value="">this is value</option>
                            <option value=""></option>
                        </select>
                    </div>
                    <!-- cover photo -->
                    <div class="input_field">
                        <h5>
                            Tag
                        </h5>
                        <input type="text" class="input">
                    </div>
                </div>
            </div>
        </div>
        <!-- submit -->
        <div class="submit">
            <button @click="goBanks()">
                Cancel
            </button>
            <button @click="bankSubmit()">
                Save
            </button>
        </div>
    </div>
    <!-- product style -->
    <div  class="wrapper_shop_create">
        <!-- add new product -->
        <div  class="shop_create">
            <!-- header -->
            <div class="header_shop_create">
                <h4>
                    Product Style
                </h4>
                <button @click="addStyle()">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M5 0C5.26522 0 5.51957 0.105357 5.70711 0.292893C5.89464 0.48043 6 0.734784 6 1V4H9C9.26522 4 9.51957 4.10536 9.70711 4.29289C9.89464 4.48043 10 4.73478 10 5C10 5.26522 9.89464 5.51957 9.70711 5.70711C9.51957 5.89464 9.26522 6 9 6H6V9C6 9.26522 5.89464 9.51957 5.70711 9.70711C5.51957 9.89464 5.26522 10 5 10C4.73478 10 4.48043 9.89464 4.29289 9.70711C4.10536 9.51957 4 9.26522 4 9V6H1C0.734784 6 0.48043 5.89464 0.292893 5.70711C0.105357 5.51957 0 5.26522 0 5C0 4.73478 0.105357 4.48043 0.292893 4.29289C0.48043 4.10536 0.734784 4 1 4H4V1C4 0.734784 4.10536 0.48043 4.29289 0.292893C4.48043 0.105357 4.73478 0 5 0Z" fill="white"/>
                    </svg>
                    New Style
                </button>
            </div>
            <!-- container input -->
            <div v-for="(style,index) of productStyleList" :key="index" class="container_input">
                <!-- Price & Stock -->
                <div class="input_list">
                    <!-- price -->
                    <div class="input_field">
                        <h5>
                            Price
                        </h5>
                        <div class="input input_price">
                            <input type="text"  placeholder="฿ 0.00">
                            <h6>
                                THB
                            </h6>
                        </div>
                    </div>
                    <!-- stock -->
                    <div class="input_field">
                        <h5>
                            Stock
                        </h5>
                        <input type="text" class="input">
                    </div>
                </div>
                <!-- color and size -->
                <div class="input_list">
                    <!-- color -->
                    <div class="input_field">
                        <h5>
                            Color
                        </h5>
                        <input type="text" class="input">
                    </div>
                    <!-- size-->
                    <div class="input_field">
                        <h5>
                            Size
                        </h5>
                        <input type="text" class="input">
                    </div>
                </div>
                <!-- photo Style-->
                <div class="input_field">
                    <h5>
                        Photo Style
                    </h5>
                    <!-- <div class="input_img">

                    </div> -->
                    <div class="input_img">
                        <input @change="uploadCoverImage"  id="cover_image" type="file" accept="image/*">
                        <label  for="cover_image">
                            <div>
                                <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21 5H5C3.93913 5 2.92172 5.42143 2.17157 6.17157C1.42143 6.92172 1 7.93913 1 9V29M1 29V33C1 34.0609 1.42143 35.0783 2.17157 35.8284C2.92172 36.5786 3.93913 37 5 37H29C30.0609 37 31.0783 36.5786 31.8284 35.8284C32.5786 35.0783 33 34.0609 33 33V25M1 29L10.172 19.828C10.9221 19.0781 11.9393 18.6569 13 18.6569C14.0607 18.6569 15.0779 19.0781 15.828 19.828L21 25M33 17V25M33 25L29.828 21.828C29.0779 21.0781 28.0607 20.6569 27 20.6569C25.9393 20.6569 24.9221 21.0781 24.172 21.828L21 25M21 25L25 29M29 5H37M33 1V9M21 13H21.02" stroke="#BDBDBD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>                            
                            </div>
    
                            <h6 >
                            <span>
                                Upload a file
                            </span> or drag and drop
                            </h6>
                            <p >
                                PNG or JPG up to 10MB
                            </p>
                            
                        </label>
                        
                    </div>
                </div>
            </div>
        </div>
        <!-- submit -->
        <div class="submit">
            <button @click="goBanks()">
                Cancel
            </button>
            <button @click="bankSubmit()">
                Save
            </button>
        </div>
    </div>
</div>
</template>
<style scoped>
*{
    box-sizing: border-box;
}
.wrapper_shop{
    display: flex;
    width: 100%;
    height: fit-content;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    gap: 24px;
}
.wrapper_shop_create{
    display: flex;
    position: relative;
    width: 816px;
    height: fit-content;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    background-color: #FFFFFF;
}
.shop_create{
    display: flex;
    width: 100%;
    height: inherit;
    flex-direction: column;
    justify-content: center;
    padding: 20px;
    /* align-items: center; */
    gap: 24px;
}
.header_shop_create{
    display: flex;
    width: 100%;
    height: fit-content;
    justify-content: space-between;
    align-items: center;

}
.header_shop_create h4{
    width: fit-content;
    height: fit-content;
    font-size: 18px;
    font-weight: 500;
    color: #212121;
}
.header_shop_create button{
    display: flex;
    width: fit-content;
    height: 36px;
    border-radius: 4px;
    border: none;
    padding: 8px 12px 8px 8px;
    gap: 4px;
    background-color: #BDBDBD;
    color: #fff;
    font-size: 14px;
    font-weight: 500;
    box-shadow: 0px 1px 2px 0px #0000000D;
    align-items: center;
    justify-content: start;
    cursor: pointer;
    white-space: nowrap
}
.header_shop_create button svg{
    width: 10px;
    height: 10px;
    margin: 5px;
}
.container_input{
    display: flex;
    width: 100%;
    height: fit-content;
    flex-direction: column;
    gap: 24px;
}
.container_input .input_field{
    display: flex;
    width: inherit;
    height: fit-content;
    flex-direction: column;
    gap: 4px;
}
.container_input .input_field h5{
    display: flex;
    width: fit-content;
    height: 20px;
    align-items: center;
    font-size: 14px;
    font-weight: 500;
}
.input_field .input{
    width: 100%;
    height: 36px;
    padding: 8px 12px;
    background-color: #fff;
    border: 1px solid;
    border-radius: 4px;
    border-color: #D1D5DB;
    box-shadow: 0px 1px 2px 0px #0000000D;

}
.input:focus-within{
    outline: auto;
}
.input_field .input_description{
    width: 100%;
    height: 100px;
    min-height: 36px;
    max-height: 150px;
    padding: 8px 12px;
    resize: vertical;
    border: 1px solid;
    border-radius: 4px;
    border-color: #D1D5DB;
    background-color: #fff;
    box-shadow: 0px 1px 2px 0px #0000000D;
}
.input_field .input_price{
    display: flex;
}
.input_field .input_price input{
    width: 100%;
    height: fit-content;
   border: none;
   outline: none;
}
.input_field .input_price h6{
    font-size: 14px;
    font-weight: 400;
    color: #9E9E9E;
}
.input_field .input_img{
    display: flex;
    width: 100%;
    height: 140px;
    border: 2px dashed; 
    border-radius: 4px;
    border-color: #E0E0E0;
    justify-content: center;
    align-items: center;
}
.input_img input{
    display: none;
}
.input_img label{
    display: flex;
    width: 100%;
    height:100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 4px;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}
.input_img label div{
    display: flex;
    width: 48px;
    height: 48px;
    justify-content: center;
    align-items: center;
}
.input_img label div svg{
    width: 36px;
    height: 36px;
}
.input_img label h6{
    width: fit-content;
    height: 20px;
    font-size: 14px;
    font-weight: 500;
    color: #757575;
}
.input_img label h6 span{
    cursor: pointer;
    color: #26AC34;
}
.input_img label p{
    width: fit-content;
    height: 16px;
    font-weight: 400;
    font-size: 12px;
    color: #6B7280;
}
.input_img label img{
    width: 100%;
    height: auto;
    background-position: center;
}
.input_list{
    display: flex;
    width: 100%;
    height: fit-content;
    gap: 24px;
}

.submit{
    display: flex;
    width: 100%;
    height: 60px;
    padding: 12px 24px;
    gap: 8px;
    justify-content: end;
}
.submit button{
    width: 80px;
    height: 36px;
    border: 1px solid;
    padding: 8px 12px;
    border-radius: 4px;
    border-color: #E0E0E0;
    box-shadow: 0px 1px 2px 0px #0000000D;
    cursor: pointer;
}
.submit button:nth-child(1){
    background-color: #fff;
    color: #212121;
}
.submit button:nth-child(2){
    background-color: #26AC34;
    color: #fff;
}
</style>