app.component("pressure-chart", {
  template: `<div id="pressureChart" style="width:100%; height:400px;">Test</div>`,
  props: ["parentDates"],
  methods: {
    createChart() {
      // const conElement = document.getElementById("container");
      if (this.parentDates.length > 0) {
        let datesArray = JSON.parse(JSON.stringify(this.parentDates));
        let data = {
          timestamp: [],
          pressures: [],
        };
        // Define tempature
        const pressures = datesArray.map((element) => {
          return element.pressure;
        });
        const timestamps = datesArray.map((element) => {
          let date = new Date(element.time);
          var dd = String(date.getDate()).padStart(2, "0");
          var mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
          var yyyy = date.getFullYear();
          date = dd + "/" + mm + "/" + yyyy;
          return date;
        });

        data["timestamp"] = timestamps;
        data["pressures"] = pressures;

        console.log(data);

        // Define start and end date
        if (this.dateStart && this.dateEnd) {
          startDate = new Date(this.dateStart);
          endDate = new Date(this.endDate);
        } else {
          startDate = new Date(datesArray[0].time);
          endDate = new Date(datesArray[datesArray.length - 1].time);
          // console.log(startDate.getDate());
          // console.log(startDate);
        }
        // Define Date end
        const chart = Highcharts.chart("pressureChart", {
          title: {
            text: "Pressures",
          },

          yAxis: {
            title: {
              text: "Pressure (°C)",
            },
          },

          xAxis: {
            categories: data.timestamp,
            labels: {
              rotation: -90,
              // the step config is how you control how many x-axis labes are shown
              // this will help when there are lots of labels
            },
          },

          series: [
            {
              name: "Pressure",
              data: data.pressures,
            },
          ],

          responsive: {
            rules: [
              {
                condition: {
                  maxWidth: 500,
                },
                chartOptions: {
                  legend: {
                    layout: "horizontal",
                    align: "center",
                    verticalAlign: "bottom",
                  },
                },
              },
            ],
          },
        });
      }
      // console.log(chart);
    },
  },
  mounted() {
    this.$watch(
      "parentDates",
      (date) => {
        this.createChart();
      },
      { immediate: true }
    );
    // this.createChart();
  },
  watch: {
    parentDates(val) {
      console.log(val);
    },
  },
});
