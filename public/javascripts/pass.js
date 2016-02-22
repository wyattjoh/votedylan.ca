function showPage(){
    if(d3.select("#usName").node().value =="admin"&&
        d3.select("#pass").node().value =="UA1908"
    ){
        d3.select("#fakeMain").style("display","none");
        d3.select(".main").style("display","block");
    }
}
