
        
   
   
   const indexedDB= window.indexedDB||
    window.mozindexedDB||
    window.webkitIndexedDB||
    window.msIndexedDB||
    window.shimIndexedDB;

    const request=indexedDB.open("userdb",1);

    request.onerror=function(event){
        console.error("an error has occured with indexedb");
        console.error(event);
    };

    request.onupgradeneeded= function(){
        const db= request.result;
        const store =db.createObjectStore("userdb",{ keyPath: "uid"  });
        store.createIndex("password", ["password"], {unique:false});
        store.createIndex("name", ["name"], {unique:false});

    };


    request.onsuccess= function(){
        const db= request.result;
        const transaction= db.transaction("userdb","readwrite");

       const store= transaction.objectStore("userdb");
       const uidIndex= store.index("uid");
       const passwordIndex= store.index("password");
       const nameIndex= store.index("name");

       store.put({ uid:12345, password:"23-10-2001", name:"subject1"});
       store.put({ uid:45678, password:"23-10-2001", name:"subject1"});
       store.put({ uid:98765, password:"23-10-2001", name:"subject1"});

       const idQuery= store.get(12345);

       idQuery.onsuccess=function(){
           console.log('idQuery',idQuery.result);
           console.log(idQuery);
       };
       

    }
