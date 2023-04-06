import { useLocation } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import Chart from 'chart.js/auto';




function SummaryGraph(props) {
    const location = useLocation();
    const pets = location.state
    console.log(pets)
    let babyCount = 0
    let youngCount = 0
    let adultCount = 0
    let seniorCount = 0
    for(let i = 0; i < pets.length; i++) {
        if(pets[i].age === "Adult"){
            adultCount++
        }
        if(pets[i].age === "Baby"){
            babyCount++
        }
        if(pets[i].age === "Young"){
            youngCount++
        }
        if(pets[i].age === "Senior"){
            seniorCount++
        }
    }

    const state = {
        labels: ['Baby', 'Young', 'Adult',
                 'Senior'],
        datasets: [
          {
            label: 'Individual Count',
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [babyCount, youngCount, adultCount, seniorCount]
          }
        ]
      }

    return(
        <div>
        <h1>Summary Graph</h1>
        <h3>Find what age of Shiba is the most common</h3>
        <Bar
          data={state}
          options={{
            title:{
              display:true,
              text:'Number of Shibas Per Age Category',
              fontSize:50
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
        </div>
    )
}

export default SummaryGraph