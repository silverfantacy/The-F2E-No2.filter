var $ApiURL = 'https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97';

// 將 axios 指定給 $http 屬性
Vue.prototype.$http = axios;

var app = new Vue({
  el: '#app',
  data: {
    originalData: [], //原始資料
    selectZone: "all",//地區選單
    pageList: [], // 每頁的資料
    countOfPage: 10, // 一頁顯示20筆
    currPage: 1, // 當前頁數
    totalPages: 0, // 每個總頁數的數字
    nowPages: 0
  },
  // test: {
  //   Add: "高雄市三民區建國二路318號",
  //   Changetime: "2015-06-10T15:40:33",
  //   Class1: "3",
  //   Class2: null,
  //   Description: "高雄願景館的前身是日治時期興建的高雄市舊火車站，外觀是”和洋混合式建築”氣勢雄偉，內部則為西式的玄關及大廳。2002年為了配合鐵路、捷運、高鐵的三鐵共構，這棟老火車站建築物遷移到附近的空地上，並由市府規劃，以'數位博物館'的型式，其中歷史迴廊對於鐵道文化及往日風貌有一系列回顧，讓遊客可以重溫老車站的過往風華，而3D虛擬互動區則讓參觀者以虛擬實境的方式飛越高雄的重要景點並同時見證高雄的發展歷史。願景館是認識高雄過去與未來的最佳場所，而願景橋、鐵路文化棧道、風的祝福廣場…等公共藝術區也是遊客們最愛駐足與拍照留念的美麗景點。",
  //   Gov: "397000000A",
  //   Id: "C1_397000000A_000009",
  //   Level: null,
  //   Name: "高雄願景館",
  //   Opentime: "週二至週日10:00-18:00，每週一公休",
  //   Parkinginfo_px: "0",
  //   Parkinginfo_py: "0",
  //   Picdescribe1: "高雄願景館?",
  //   Picture1: "http://khh.travel/FileArtPic.ashx?id=705&w=1280&h=960",
  //   Px: "120.30211",
  //   Py: "22.63961",
  //   Remarks: "",
  //   Tel: "886-7-2363357",
  //   Ticketinfo: "免費參觀",
  //   Toldescribe: "高雄願景館的前身是日治時期興建的高雄市舊火車站，外觀是”和洋混合式建築”氣勢雄偉，內部則為西式的玄關及大廳。2002年為了配合鐵路、捷運、高鐵的三鐵共構，這棟老火車站建築物遷移到附近的空地上，並由市府規劃，以'數位博物館'的型式，其中歷史迴廊對於鐵道文化及往日風貌有一系列回顧，讓遊客可以重溫老車站的過往風華，而3D虛擬互動區則讓參觀者以虛擬實境的方式飛越高雄的重要景點並同時見證高雄的發展歷史。願景館是認識高雄過去與未來的最佳場所，而願景橋、鐵路文化棧道、風的祝福廣場…等公共藝術區也是遊客們最愛駐足與拍照留念的美麗景點。",
  //   Travellinginfo: "",
  //   Website: "",
  //   Zone: "三民區",
  //   _id: 1
  // },
  created: function () {
    // 先執行預設 function (下行打開就可以看到內容嘍)
    this.getData();
    // this.showPageList(); 
    // this.totalPage(pageStart);
  },
  methods: {
    // axios取得原始資料
    getData: function () {
      let vm = this;
      vm.$http.get($ApiURL)
        .then(function (response) {
          // console.log(response);
          // console.log(response.data.result.records[0]);
          let responseData = response.data.result.records;
          // console.log(responseData);
          // console.log(responseData.length);
          var str = '';
          for (i = 0; i < responseData.length; i++) {
            // console.log(i);
            str = {
              Add: responseData[i].Add,
              Description: responseData[i].Description,
              Name: responseData[i].Name,
              Opentime: responseData[i].Opentime,
              Picture: responseData[i].Picture1,
              Px: responseData[i].Px,
              Py: responseData[i].Py,
              Tel: responseData[i].Tel,
              Ticketinfo: responseData[i].Ticketinfo,
              Zone: responseData[i].Zone,
            };
            // console.log(str);
            // str資料都有出來
            vm.originalData.push(str);
          }
          // console.log(vm.originalData);
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    // 分頁切換
    setPage: function (index) {
      // index就是html的n
      let vm = this;
      if (index <= 0 || index > vm.totalPages) {
        return;
      }
      vm.currPage = index;
    },

    // 重置起始頁
    reSetPage: function () {
      let vm = this;
      vm.currPage = 1;
    },

  },
  computed: {

    // 區域列表
    locationName: function () {
      let vm = this;
      var str = '';
      var zoneName = [];
      // 取出所有地區
      for (i = 0; i < vm.originalData.length; i++) {
        // console.log(vm.originalData.length);
        str = vm.originalData[i].Zone;
        zoneName.push(str);
      }
      // console.log(zoneName);

      //篩選
      var result = zoneName.filter(function (element, index, arr) {
        return arr.indexOf(element) === index;
      });
      // var repeat = zoneName.filter(function (element, index, arr) {
      //   return arr.indexOf(element) !== index;
      // });
      // console.log(result); // 個別
      // console.log(repeat); // 全部
      return result;
    },

    // 篩選地區
    filterData: function () {
      let vm = this;
      switch (vm.selectZone) {
        case 'all':
          return vm.originalData;
          break;
        case vm.selectZone:
          var newData = [];
          vm.originalData.forEach(
            function (item) {
              if (item.Zone == vm.selectZone) {
                newData.push(item);
              }
            }
          );
          return newData;
          break;
      }
    },

    // 整理要顯示頁數的資料
    showPageList: function () {
      let vm = this;
      vm.pageList = [];
      // console.log(vm.filterData,vm.pageList)
      // 計算總頁數(無條件捨棄)=總資料/每頁顯示幾筆
      vm.totalPages = Math.ceil(vm.filterData.length / vm.countOfPage);
      // console.log(vm.totalPages);

      var start = vm.currPage * vm.countOfPage - vm.countOfPage;
      // Start是開始時的陣列序號
      var end = vm.currPage * vm.countOfPage;
      // end是結束時的陣列序號
      // console.log(start,end,vm.totalPages); 
      //0,10,X

      vm.filterData.forEach(function (item, i) {
        // 0~9筆資料
        if (i >= start && i < end) {
          vm.pageList.push(item)
        }
      })
      console.log(vm.pageList);
      return vm.pageList;
    }
  }
})