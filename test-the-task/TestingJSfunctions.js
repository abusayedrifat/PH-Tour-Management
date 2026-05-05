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

for (let i = 0; i <= 90000; i++) {
    const transaction =Math.floor(Math.random() *0x10000000000) 
        .toString(16)
        .padStart(10, '0')
        .toUpperCase()

        if (generated.has(transaction)) {
        throw new Error('dupliacate found')
    }
    console.log(transaction);
}

//* 0x1000000  -> 16^6 total possible 6-digit hex values
//* Math.random() * 0x1000000 → generates range 0 to FFFFFF
//* .toString(16) → converts number to hex
//* .padStart(6, '0') → ensures always 6 characters

