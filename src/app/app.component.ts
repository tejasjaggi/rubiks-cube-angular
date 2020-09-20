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
  technique: any = "";
  missingColours: any = true;
  httpOptions: { "headers": HttpHeaders; };
  stepsToSolve: any = '';

  

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
    $('colourDropdown').val(value);
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
      var output = ''
for(let move of data.result)
{
  if(move == "F'")
  {
    output+=" Front Inverse,"
  }
  else if (move == "F")
  {
    output+=" Front,"
  }
  else if (move == "F2")
  {
    output+=" Front, Front,"
  }
  else if (move == "R")
  {
    output+=" Right,"
  }
  else if (move == "R2")
  {
    output+=" Right, Right,"
  }
  else if (move == "R'")
  {
    output+=" Right Inverse,"
  }
  else if (move == "L")
  {
    output+=" Left,"
  }
  else if (move == "L2")
  {
    output+=" Left, Left,"
  }
  else if (move == "L'")
  {
    output+=" Left Inverse,"
  }
  else if (move == "U")
  {
    output+=" Up,"
  }
  else if (move == "U2")
  {
    output+=" Up, Up,"
  }
  else if (move == "U'")
  {
    output+=" Up Inverse,"
  }
  else if (move == "B")
  {
    output+=" Back,"
  }
  else if (move == "B2")
  {
    output+=" Back, Back,"
  }
  else if (move == "B'")
  {
    output+=" Back Inverse,"
  }
  else if (move == "D")
  {
    output+=" Down,"
  }
  else if (move == "D2")
  {
    output+=" Down, Down,"
  }
  else if (move == "D'")
  {
    output+=" Down Inverse,"
  }
  else if (move == "Y")
  {
    output+=" Rotate Y,"
  }
  else if (move == "Y'")
  {
    output+=" Inverse Y,"
  }
  else if (move == "Y2")
  {
    output+=" Rotate Y, Rotate Y,"
  }
  else
  {
    output+= move+','
  }

}
output+= " CONGRATULATIONS!"

      document.getElementById('textmain').innerHTML = output
  
    })
  
  }

  resetColours()
  {
    if(!this.colourEntered)
    this.colourEntered = true;
    document.getElementById('textmain').innerHTML = ""
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
