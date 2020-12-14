
let theTree = { tagName: "/", 
             subTags: 
              [{ tagName: "Programmeren",
              subTags: [
                { tagName: "WebDevelopment", 
                  subTags: [ 
                      {tagName: "Node", subTags: [{tagName: "NPM"}]},
                      {tagName: "React", subTags: []},
                      {tagName: "PHP", subTags: [{tagName: "Framework"}]},
                ] },
                { tagName: "Functioneel",
                    subTags: [
                      {tagName: "Monads", subTags: []},
                      {tagName: "Javascript", subTags: []},
                      {tagName: "React", subTags: []},
                    ]
                }
              ]},
              {tagName: "Corona", subTags: [
                {tagName: "Trump", subTags: []},
                {tagName: "Vaccins", subTags: [{ tagName: "Pfizer", subTags: [] }]},
                {tagName: "Moderna", subTags: []},
              {tagName: "Tests", subTags: []}
            ]},
            ] 
  }

function printTree( treeNode, indent = "" ) {
  console.log( indent + treeNode.tagName );
  if( treeNode.subTags && treeNode.subTags.length > 0 ) {
     treeNode.subTags.forEach( subtag => { printTree(subtag, indent + "  " ) } )
  }
}

function tree2List( treeNode ) {
  // console.log( indent + treeNode.tagName );
  result = [ treeNode.tagName ]
  if( treeNode.subTags && treeNode.subTags.length > 0 ) {
     treeNode.subTags.forEach( subtag => { result = result.concat( tree2List(subtag) ) } )
  }
  return result
}

function findInTree( treeNode, filterFunc ) {
//  console.log( "trying:", treeNode.tagName )
   if( filterFunc(treeNode) ) {
//     console.log("GOTTIT:", treeNode.tagName)
     return treeNode;
   } else if(treeNode.subTags && treeNode.subTags.length > 0) {
     let childResult = undefined;
     for( child of treeNode.subTags ) {
       childResult = findInTree( child, filterFunc )
       if( childResult ) {
         break;
       }
     }
//     console.log("CHILDRESULT FOR:",treeNode.tagName, "is:", childResult ? childResult.tagName : "undefined")
     return childResult;
   } else {
//    console.log("NOT:", treeNode.tagName)
    return undefined;
   }
   throw "THIS SHOULD NEVER HAPPEN"
}

function addChild( tree, tagName, childName ) {
  const parent = findInTree( tree, treenode => treenode.tagName === tagName );
  if( ! parent ) {
    throw "PARENT '"+tagName+"' NOT FOUND" 
  }
  if( parent.subTags == undefined ) {
    parent.subTags = [];
  }
  parent.subTags.push({ tagName: childName, subTags: [] })
}

// const foundNode = findInTree( theTree, node => node.tagName.startsWith("Boterham") )
// console.log("FOUND IT:", foundNode)

addChild( theTree, "Corona", "financieel")
addChild( theTree, "NPM", "Yarn")
addChild( theTree, "/", "Kerstmis")
addChild( theTree, "Kerstmis", "Corona")

console.dir( theTree, {depth: 10000} )

addChild( theTree, "Lantarenpaal", "Boterham")
// printTree(theTree)
//console.log( tree2List(theTree))