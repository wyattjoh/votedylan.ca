function showPage(){
    console.log('aaa')
    if(d3.select("#usName").node().value =="admin"&&
        d3.select("#pass").node().value =="1908UA"
    ){
        d3.select("#fakeMain").style("display","none");
        d3.select(".main").style("display","block");

    }
}
