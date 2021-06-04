
//Test stuff for getting the unit tests up and going.
hello();

export function hello(){
   console.log("hello");
   return "hello";
};

const feedPerTooth = 0.04;
const toolDia = 10;
const toolLength = 30;
const noCuttingEdges = 4;
const spindleSpeed = 500;


class Member {

   constructor(radial, axial){
      this.radial = radial;
      this.axial = axial;
      this.feedPerTooth = feedPerTooth;
   }

   //Increasing the feed per tooth to compensate for radial chip thinning
   compensatedFeedPerTooth(){
      if(this.radial < toolDia/2){
         this.feedPerTooth = (feedPerTooth * toolDia)/(2 * Math.sqrt(toolDia*this.axial - Math.pow(this.axial,2)));
      }
   }

   cuttingSpeed(){
      return (spindleSpeed * toolDia * noCuttingEdges) / 1000;
   }

   tableFeed(){
      return this.feedPerTooth * toolDia * spindleSpeed;
   }

   noPassesAxial(){
      return 1;
   }

   noPassesRadial(){
      return 1;
   }

   poorToolPositionFactor(){
      if(this.axial >= toolDia/2){
         return (this.axial / toolDia);
      }
   }

   fitness(){
   
      this.compensatedFeedPerTooth();
      
      var cuttingSpeed = cuttingSpeed();
      var tableFeed = tableFeed();

      return -1;
   }
}

var mem = new Member(10,10, machiningParameters);
mem.fitness();


