// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};



// factory function that creates new specimens
let pAequorFactory = (num, dnaArray) => {
  return {
    specimenNum: num,
    dna: dnaArray,
    mutate() {
      const randomIndex = Math.floor(Math.random() * this.dna.length);
      const currentBase = this.dna[randomIndex];
      const dnaBases = ['A', 'T', 'C', 'G'];
      let newBase = dnaBases[Math.floor(Math.random() * dnaBases.length)];
    
      // Ensure that the new base is different from the current base
      while (newBase === currentBase) {
        newBase = dnaBases[Math.floor(Math.random() * dnaBases.length)];
      }
    
      // Replace the current base with the new base
      this.dna[randomIndex] = newBase;
    
      // Return the mutated DNA      
      return this.dna;
    },
    //compare how much DNA two specimens share
    compareDNA(newAequorDNA) {
      let inCommonDnaBases = 0;
      for(let i = 0; i < newAequorDNA.dna.length; i++) {
        if(newAequorDNA.dna[i] === this.dna[i]) {
          inCommonDnaBases++;
        }
      }
      let percentageDnaInCommon = inCommonDnaBases / this.dna.length * 100;
      console.log(`specimen #${this.specimenNum} and specimen #${newAequorDNA.specimenNum} have ${percentageDnaInCommon.toFixed(2)} percent DNA in common`);
    },
    //return if a specimen will survive or not -   G or C DNA bases must occur in more that 60% of the DNA strands
    willLikelySurvive() {
      let gBases = this.dna.filter(p => p === 'G');
      let gPercentage = gBases.length / this.dna.length * 100;
      

      let cBases = this.dna.filter(p => p === 'C');
      let cPercentage = cBases.length / this.dna.length * 100;

      return gPercentage.toFixed(2) >= 60 || cPercentage.toFixed(2) >= 60;
    }
  }
}

// this function creates survivors by using the factory function
let createThirtySurvivors = () => {
  let pAequorSurvivors = [];
  let i = 1; // Start counting from 1
  
  //while there aren't 30 survivors in the list we keep instantiating new ones
  while (pAequorSurvivors.length < 30) {
    let newOrganism = pAequorFactory(i, mockUpStrand());
    //if a new instance is a survivor then we add it to the list
    if (newOrganism.willLikelySurvive()) {
      pAequorSurvivors.push(newOrganism);
    }
    i++;
  }
  
  return pAequorSurvivors;
}



console.log(createThirtySurvivors());
