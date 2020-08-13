class LKTool {
    fileToBase64Url(file, callback){
        let src = '';
        const reader = new FileReader();
        if(file){
            reader.readAsDataURL(file);
        }else {
            src = '';
        }
        reader.onloadend = ()=>{
            src = reader.result;
            callback && callback(src);
        }
    }
}

export default LKTool;