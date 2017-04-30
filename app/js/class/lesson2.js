//字符串扩展


{
  console.log('a',`\u0061`);
  //16进制码超过0XFFFF es5乱码，只能处理2个字节一个字符
  console.log('s',`\u20BB7`);
//es6正常，可以一次处理4个字节长度
  console.log('s',`\u{20BB7}`);

}


{
  let s='𠮷';
  console.log('length',s.length);
  //es5 charrAt 返回一个字符串某一个索引的字符，s超过2个字节无法处理
  console.log('0',s.charAt(0));
  console.log('1',s.charAt(1));
  //charCodeAt返回字符对应编码
  console.log('at0',s.charCodeAt(0));
  console.log('at1',s.charCodeAt(1));

  let s1='𠮷a';
  console.log('length',s1.length);
  //es6 把四个字节全部处理
  console.log('code0',s1.codePointAt(0));
  //返回编码
  console.log('code0',s1.codePointAt(0).toString(16));
  //1此时按照正常顺序取，同es5
  console.log('code1',s1.codePointAt(1));
  //2就去找a，还是按照2个字节一个字符串的规律
  console.log('code2',s1.codePointAt(2));
}

{
    //与上面对应 es5错
  console.log(String.fromCharCode("0x20bb7"));
  //与上面对应 es6正常处理超过范围
  console.log(String.fromCodePoint("0x20bb7"));
}

{
    //es5处理乱码
  let str='\u{20bb7}abc';
  for(let i=0;i<str.length;i++){
    console.log('es5',str[i]);
  }
  //es6正确判断字符得到
  for(let code of str){
    console.log('es6',code);
  }
}

{
  let str="string";
  console.log('includes',str.includes("c"));
  console.log('start',str.startsWith('str'));
  console.log('end',str.endsWith('ng'));
}

{
  let str="abc";
  console.log(str.repeat(2));
}

{
  let name="list";
  let info="hello world";
  let m=`i am ${name},${info}`;
  console.log(m);
}

{
    //字符串补白，例如 日期 1 变为01 ，第一个为前，第二个为后
  console.log('1'.padStart(2,'0'));
  console.log('1'.padEnd(2,'0'));
}


//标签字符串
{
  let user={
    name:'list',
    info:'hello world'
  };
  console.log(abc`i am ${user.name},${user.info}`);
  //可对每个字符串就行处理
  function abc(s,v1,v2){
    console.log(s,v1,v2);
   // return s+v1+v2
  }
}

{
    //同python里面的raw，忽略转义
  console.log(String.raw`Hi\n${1+2}`);
  console.log(`Hi\n${1+2}`);
}
