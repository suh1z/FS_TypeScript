interface HeaderProps {
  name: string;
}

interface TotalProps {
  exercises: number;
}

interface ContentProps {
  contentLista: CoursePart[];
}

interface ContentParts {
  name: string;
  exerciseCount: number;
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBasic extends CoursePartBase {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartBase {
  backgroundMaterial: string;
  kind: "background"
}

interface CoursePartDescription extends CoursePartBase {
  description: string;
  kind: "description"
}

interface CoursePartSpecial extends CoursePartBase {
  description: string;
  requirements: string[],
  kind: "special"
}

type CoursePart = CoursePartBasic | CoursePartSpecial | CoursePartGroup | CoursePartBackground | CoursePartDescription;

const Part = (part: CoursePart) => {
  switch (part.kind) {
    case "basic":
      return (
        <div>
            <h5>{part.name}</h5>
            <p>{part.exerciseCount}</p>
        </div>
      );
        case "group":
          return (
            <div>
              <h5>{part.name}</h5>
              <p>{part.exerciseCount}</p>
              <p>{part.groupProjectCount}</p>
            </div>
          );
        case "background":
          return (
            <div>
              <h5>{part.name}</h5>
              <p>{part.exerciseCount}</p>
              <p>{part.backgroundMaterial}</p>
            </div>
          );
        case "description":
          return (
            <div>
              <h5>{part.name}</h5>
              <p>{part.exerciseCount}</p>
              <p>{part.description}</p>
            </div>
          );
          case "special":
            return (
              <div>
                <h5>{part.name}</h5>
                <p>{part.exerciseCount}</p>
                <p>{part.description}</p>
                <ul>
                <p>Requirements:</p>

                {part.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>             
              </div>
            );
        }
      };      

const Header = (props: HeaderProps) => {
  return <h1>{props.name}</h1>;
};

const Total = (props: TotalProps) => {
  return <p> Number of exercises {props.exercises}</p>;
};

const Content = (props: ContentProps) => {
  return <div>
  {props.contentLista.map((part) => (
    <Part key={part.name} {...part} />
  ))}
</div>
};


const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special"
    }
  ];

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <div>
      <Header name={courseName} />
      <Content contentLista={courseParts} />
      <br/>
      <Total exercises={totalExercises} />
    </div>
  );
};

export default App;


