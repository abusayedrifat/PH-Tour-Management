/* eslint-disable no-undef */
/* eslint-disable no-console */

const generated = new Set()

// for(let i=0; i<=50000 ; i++){
//     const transaction = Math.floor(Math.random()*10000000000)
//     console.log(transaction);
    
//     if (generated.has(transaction)) {
//         throw new Error('dupliacate found')
//     }
// }

for (let i = 0; i <= 1; i++) {
    const transaction =Math.floor(Math.random() *0x10000000000000) 
        .toString(16)
        .padStart(13, '0')
        .toUpperCase()

        if (generated.has(transaction)) {
        throw new Error('dupliacate found')
    }
    // console.log(transaction);


}

const name = "asdasda asdmas asd123423 236@@@(@   @@@@@@@@@.png"

 const fileName = name
                .toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/\./g, "-")
                .replace(/[^a-zA-Z0-9]/g, "")
            

            const extension = name.split(".").pop()
            // console.log(extension);
            

            const uniqueFileName = Math.floor(Math.random()* 0x10000000000000)
                .toString(16)
                .padStart(13, "0")+"-"+Date.now()+"-"+fileName+"."+extension

                console.log(uniqueFileName);


                const url = "https://res.cloudinary.com/dnlmdyhsp/image/upload/v1778646945/35551fca10241-1778646942328-deceptionjpg-jpg.jpg";

const result = url.match(/\/v\d+\/(.*?)\.(jpg|jpeg|png|gif|webpp)$/i)
                console.log(result);
                
//* 0x1000000  -> 16^6 total possible 6-digit hex values
//* Math.random() * 0x1000000 → generates range 0 to FFFFFF
//* .toString(16) → converts number to hex
//* .padStart(6, '0') → ensures always 6 characters

// console.log(result.length);

for (let i = 0; i <= 1000; i++) {
const otp = Math.ceil(Math.random()*(10**6))
.toString()
.padStart(6, '0')
console.log(otp);

}

