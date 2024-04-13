<script setup>
</script>
<template>
    <div class="wrapper_my_gallery_add">
        <div class="my_gallery_add">
            <!-- header -->
            <h6 class="header_my_gallery_add">
                Add New Project
            </h6>
            <!-- container -->
            <div class="wrapper_input">
                <!-- name-->
                <div class="input_field">
                    <h6>
                        Name
                    </h6>
                    <input type="text" class="input">
                </div>
                <!-- description-->
                <div class="input_field">
                    <h6>
                        Description
                    </h6>
                    <textarea name="" class="" placeholder="Something about product."></textarea>
                </div>
                <!-- cover photo -->
                <div class="img_cover input_field">
                    <h6>
                        Cover photo
                    </h6>
                    <div v-show="true" @drop="dropHandle" @dragover="dragover">
                        <input @change="uploadCoverImage" id="cover_image" type="file" accept="image/*">
                        <label for="cover_image">
                            <div>
                                <svg width="38" height="38" viewBox="0 0 38 38" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M21 5H5C3.93913 5 2.92172 5.42143 2.17157 6.17157C1.42143 6.92172 1 7.93913 1 9V29M1 29V33C1 34.0609 1.42143 35.0783 2.17157 35.8284C2.92172 36.5786 3.93913 37 5 37H29C30.0609 37 31.0783 36.5786 31.8284 35.8284C32.5786 35.0783 33 34.0609 33 33V25M1 29L10.172 19.828C10.9221 19.0781 11.9393 18.6569 13 18.6569C14.0607 18.6569 15.0779 19.0781 15.828 19.828L21 25M33 17V25M33 25L29.828 21.828C29.0779 21.0781 28.0607 20.6569 27 20.6569C25.9393 20.6569 24.9221 21.0781 24.172 21.828L21 25M21 25L25 29M29 5H37M33 1V9M21 13H21.02"
                                        stroke="#BDBDBD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </div>

                            <h6>
                                <span>
                                    Upload a file
                                </span> or drag and drop
                            </h6>
                            <p>
                                PNG or JPG up to 10MB
                            </p>

                        </label>

                    </div>
                    <div v-show="true" @drop="dropHandle" @dragover="dragover">
                        <label for="cover_image">
                            <!-- รูปที่จะเพิ่ม -->
                            <img v-show="coverImage != undefined" src="#" draggable="false" alt="preview_image"
                                id="cover-preview">
                            <!-- รูปที่มีแล้ว -->
                            <img v-show="coverImage == undefined && coverImageS == true"
                                :src="`${origin}/api/image/users/${userId}/coverphoto`" draggable="false"
                                alt="preview_image" id="cover-preview">
                        </label>
                    </div>
                </div>
                <!-- garden style and other style -->
                <div class="container_input">
                    <!-- Garden style -->
                    <div class="input_field">
                        <h6>
                            Garden style
                        </h6>
                        <select name="" id="" class="input">
                            <option value="" selected>Select your garden style</option>
                        </select>
                    </div>
                    <!-- Specify other -->
                    <div class="input_field">
                        <h6>
                            Specify Other garden style
                        </h6>
                        <input type="text" class="input">
                    </div>
                </div>
                <!--photo -->
                <div class="img_cover input_field">
                    <h6>
                        Photo
                    </h6>
                    <div v-show="true" @dragover="dragover">
                        <input @change="uploadCoverImage" id="cover_image" type="file" accept="image/*">
                        <label for="cover_image">
                            <div>
                                <svg width="38" height="38" viewBox="0 0 38 38" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M21 5H5C3.93913 5 2.92172 5.42143 2.17157 6.17157C1.42143 6.92172 1 7.93913 1 9V29M1 29V33C1 34.0609 1.42143 35.0783 2.17157 35.8284C2.92172 36.5786 3.93913 37 5 37H29C30.0609 37 31.0783 36.5786 31.8284 35.8284C32.5786 35.0783 33 34.0609 33 33V25M1 29L10.172 19.828C10.9221 19.0781 11.9393 18.6569 13 18.6569C14.0607 18.6569 15.0779 19.0781 15.828 19.828L21 25M33 17V25M33 25L29.828 21.828C29.0779 21.0781 28.0607 20.6569 27 20.6569C25.9393 20.6569 24.9221 21.0781 24.172 21.828L21 25M21 25L25 29M29 5H37M33 1V9M21 13H21.02"
                                        stroke="#BDBDBD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </div>

                            <h6>
                                <span>
                                    Upload a file
                                </span> or drag and drop
                            </h6>
                            <p>
                                PNG or JPG up to 10MB
                            </p>

                        </label>

                    </div>
                    <div v-show="true" @dragover="dragover">
                        <label for="cover_image">
                            <!-- รูปที่จะเพิ่ม -->
                            <img v-show="coverImage != undefined" src="#" draggable="false" alt="preview_image"
                                id="cover-preview">
                            <!-- รูปที่มีแล้ว -->
                            <img v-show="coverImage == undefined && coverImageS == true"
                                :src="`${origin}/api/image/users/${userId}/coverphoto`" draggable="false"
                                alt="preview_image" id="cover-preview">
                        </label>
                    </div>
                </div>
            </div>
        </div>
        <!-- submit --> 
        <div v-show="true" class="submit">
            <button v-show="!refreshPageS" @click="profileClear(), profileClearStatus()">
                Cancel
            </button>
            <button v-show="!refreshPageS" @click="profileSubmit">
                Save
            </button>
        </div>
    </div>
</template>
<style scoped>
*{
    box-sizing: border-box;
}
.wrapper_my_gallery_add{
    display: flex;
    width: 100%;
    height: fit-content;
    flex-direction: column;
    background-color: #fff;
    border: none;
    border-radius: 8px;
    box-shadow: 0px 1px 3px 0px #0000001A;
    overflow: hidden;
}
.my_gallery_add{
    display: flex;
    width: 100%;
    height: fit-content;
    padding: 20px;
    gap: 24px;
    flex-direction: column;
}
/* header */
.my_gallery_add .header_my_gallery_add{
    width: 100%;
    height: fit-content;
    font-size: 18px;
    font-weight: 500;
    color: #212121;
    overflow: hidden;
    text-overflow: ellipsis;
}
.my_gallery_add .wrapper_input{
    display: flex;
    width:100%;
    height: fit-content;
    flex-direction: column;
    gap: 24px;
}
.wrapper_input .input_field{
    display: flex;
    width: 100%;
    height: fit-content;
    gap: 4px;
    flex-direction: column;
    justify-content: center;
}
/* input field */
.input_field >h6{
    width: fit-content;
    height: 20px;
    color: #212121;
    font-size: 14px;
    font-weight: 500;
}
.input_field .input{
    display: flex;
    width: 100%;
    height: 36px;
    padding: 8px 12px;
    font-size: 14px;
    font-weight: 400;
    color: #212121;
    border: 1px solid #D1D5DB;
    border-radius: 4px;;
    box-shadow: 0px 1px 2px 0px #0000000D;
}
.input_field >textarea{
    display: flex;
    width: 100%;
    height: 100px;
    min-height: 36px;
    max-height: 200px;
    padding: 8px 12px;
    font-size: 14px;
    font-weight: 400;
    color: #212121;
    border: 1px solid #D1D5DB;
    border-radius: 4px;
    box-shadow: 0px 1px 2px 0px #0000000D;
    resize: vertical
}
.wrapper_input .container_input{
    display: flex;
    width: 100%;
    height: fit-content;
    gap: 24px;
}

/* .profile_item {
    display: flex;
    width: 100%;
    height: fit-content;
    flex-direction: column;
    gap: 4px;
}

.profile_item h5 {
    width: 100%;
    height: 20px;
    font-weight: 500;
    font-size: 14px;
    color: #212121;
} */
.img_cover>div {
    display: flex;
    width: 100%;
    height: 140px;
    border: 2px dashed;
    border-radius: 4px;
    border-color: #E0E0E0;
    justify-content: center;
    align-items: center;
}

.img_cover>div input {
    display: none;
}

.img_cover>div label {
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 4px;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}

.img_cover>div label div {
    display: flex;
    width: 48px;
    height: 48px;
    justify-content: center;
    align-items: center;
}

.img_cover>div label div svg {
    width: 36px;
    height: 36px;
}

.img_cover>div label h6 {
    width: fit-content;
    height: 20px;
    font-size: 14px;
    font-weight: 500;
    color: #757575;
}

.img_cover>div label h6 span {
    cursor: pointer;
    color: #26AC34;
}

.img_cover>div label p {
    width: fit-content;
    height: 16px;
    font-weight: 400;
    font-size: 12px;
    color: #6B7280;
}

/* .cover_preview{
    width: 100%;
    height: 100%;
    overflow: hidden;
} */
.img_cover>div label img {
    width: 100%;
    height: auto;
    background-position: center;

}
.submit {
    display: flex;
    width: 100%;
    height: 60px;
    padding: 12px 20px;
    gap: 8px;
    justify-content: end;
    background-color: #FAFAFA;
}

.submit p {
    display: flex;
    width: fit-content;
    height: 100%;
    font-weight: 500;
    font-size: 14px;
    align-items: center;
    color: #F75555;
}

.submit button {
    width: 80px;
    height: 36px;
    border: 1px solid;
    padding: 8px 12px;
    border-radius: 4px;
    box-shadow: 0px 1px 2px 0px #0000000D;
    cursor: pointer;
}

.submit button:nth-child(1) {
    border-color: #E0E0E0;
    background-color: #fff;
    color: #212121;
}

.submit button:nth-child(2) {
    border-color: #26AC34;
    background-color: #26AC34;
    color: #fff;
}
</style>