import { Component } from '@angular/core';
import { RubiksSolverService } from './rubiks-solver.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  title = 'angular-Rubiks-Cube';
  colourEntered: boolean = true;
  technique: any;
  missingColours: any = true;
  httpOptions: { "headers": HttpHeaders; };

  

  constructor(public RubiksSolverService: RubiksSolverService) {  
    
    
  }  

  
  setColour(index)
  {
    if(index == 4 || index == 13 || index == 22 || index == 31 || index == 40 || index == 49)
    {
      this.missingColours = this.checkState()
    }
    else
    {
          if(this.colourEntered)
    this.colourEntered = false;
    document.getElementById(index).style.backgroundColor = this.selectedColor
    }

    this.missingColours = this.checkState()
  }

  checkState()
  {

    for(let i=0; i<54; i++)
    {      
      if(document.getElementById(i.toString()).style.backgroundColor == "lightgray")
      {
        return true
      }
     
    }    
    return false
  }

  selectedColor = 'lightgray';

  colors = [
    {
      name: 'orange',
      value: 'orange'
    },
    {
      name: 'blue',
      value: 'blue'
    },
    {
      name: 'red',
      value: 'red'
    },
    {
      name: 'white',
      value: 'white'
    },
    {
      name: 'yellow',
      value: 'yellow'
    },
    {
      name: 'green',
      value: 'green'
    }
  ];

  algorithms = [
    {
      name: 'Beginner',
      value: 'Beginner'
    },
    {
      name: 'Friedrich',
      value: 'CFOP'
    },
    {
      name: 'Kociemba',
      value: 'Kociemba'
    }
  ]

 
  onChange(value){
    this.selectedColor = value;
  }
  onTechnique(value){
    this.technique = value;
  }
  solveCube(){
    var cube = ''
    for(let i=0; i<54; i++)
    {
      console.log("I ", i)
      if(document.getElementById(i.toString()).style.backgroundColor == "white")
      {
        cube+='w'
      }
      else if(document.getElementById(i.toString()).style.backgroundColor == "yellow")
      {
        cube+='y'
      }
      else if(document.getElementById(i.toString()).style.backgroundColor == "red")
      {
        cube+='r'
      }
      else if(document.getElementById(i.toString()).style.backgroundColor == "orange")
      {
        cube+='o'
      }
      else if(document.getElementById(i.toString()).style.backgroundColor ==  'green') 
      {
        cube+='g'
      }
      else if(document.getElementById(i.toString()).style.backgroundColor == "blue")
      {
        cube+='b'
      }
    }

    var postBody = {
      cube: cube,
      technique: this.technique  
  }
    this.RubiksSolverService.solveCube(postBody, this.httpOptions).subscribe(data => {
            console.log("DATA ", data)
  
    })
  
  }

  resetColours()
  {
    if(!this.colourEntered)
    this.colourEntered = true;
    
    for(let i=0; i<54; i++)
    {      
      if(i == 4 || i == 13 || i == 22 || i == 31 || i == 40 || i == 49)
      {
        continue
      }
      document.getElementById(i.toString()).style.backgroundColor = "lightgray"
    }
    this.missingColours = this.checkState()
  }

 
}
