const API = 'zbnn++vX8dQeiuPs+6Ba1A==HEH3HxAWoXOUavts'
const API2 = 'fca_live_Ul39uSMr4S1ag9RSa9opF92F9GVtfRrlFLY4zWG3'
const input = document.querySelector('input')
const button  = document.querySelector('button').addEventListener('click', getStockInfo)
const stockInfo = document.querySelector('#stockInfo')
const revInfo = document.querySelector('#revInfo')
let tkr;




function getStockInfo(){

    let ticker = input.value.toLocaleUpperCase()

    fetch(`https://api.api-ninjas.com/v1/stockprice?ticker=${ticker}` , {
    
        method: 'GET',
        headers: {
            'X-Api-Key': API
        }
    }) 
    .then(res => res.json())
    .then(async data => {

        console.log(data)
        tkr = data.ticker
       

        stockInfo.innerHTML = `<h3>Stock Info</h3>
        <br> Ticker:  ${data.ticker} <br>
        Name: ${data.name} <br>
        Price(USD): ${data.price} <br>
        Exchange: ${data.exchange}`;

        // Second link of API chain 
        const res = await fetch(`https://api.api-ninjas.com/v1/earningscalendar?ticker=${tkr}`, 
        {  method: 'GET',
            headers: {
                'X-Api-Key': API
            }
        })
        const data2 = await res.json()
        console.log(data2)

        revInfo.innerHTML = `
        <h3>Revenue stats</h3> <br>
        Estimated esp: ${data2[0].estimated_eps} <br>
        Actual esp: ${data2[0].actual_eps} <br>
        Actual Revenue: ${data2[0].actual_revenue.toLocaleString()} 

        `

       
    })
    .catch(err => {
        console.log(`error ${err}`)
    })
    
}

