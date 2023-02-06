# React JSX/TSX Guide

## Naming conventions
+ Use PascalCase for Variable, Interfaces,  Type aliases
  ```ruby
  // Variable
  const firstName = ""
  const lastName = ""
  
  // Typescript interface
  interface TodoItem {
    id: number;
    name: string;
    value: string;
  }

  // Typescript type alias
  type TodoList = TodoItem[];
  ```
  
+ Folder/File Naming: Use camelCase for folder and non-component file names and PascalCase for component file names
  ```ruby
  src/utils/form.ts
  src/hooks/useForm.ts
  src/components/banners/edit/Form.tsx
  ```
  #### NOTED: hooks file should always start with "use..."
  
+ Extensions: Use ``.js`` ``.jsx`` ``.tsx``  extension for React components.

+ Filename: Use PascalCase for filenames. E.g., ``ReservationCard.jsx``
  ```ruby
  // ❌
  import reservationCard from './ReservationCard';

  // ✅
  import ReservationCard from './ReservationCard';

  // ❌
  const ReservationItem = <ReservationCard />;

  // ✅
  const reservationItem = <ReservationCard />;
  ```

+ Component Naming: Use the filename as the component name. E.g. 
  ``ReservationCard.jsx`` should have a reference name of ``ReservationCard``. However, for root components of a directory, 
  use ``index.jsx`` as the filename and use the directory name as the component name:
  ```ruby
  // ❌
  import Footer from './Footer/Footer';

  // ❌
  import Footer from './Footer/index';

  // ✅
  import Footer from './Footer';
  ```
  
+ Props Naming: Avoid using DOM component prop names for different purposes. E.g. style, className, onClick
  ```ruby
  // ❌
  <MyComponent style="fancy" />

  // ❌
  <MyComponent className="fancy" />

  // ✅
  <MyComponent variant="fancy" />
  ```
  
## Props
+ Always use camelCase for prop names.
  ```ruby
  // ❌
  <Foo
    UserName="hello"
    phone_number={12345678}
  />

  // ✅
  <Foo
    userName="hello"
    phoneNumber={12345678}
  />
  ```
  
+ Omit the value of the prop when it is explicitly true. ``eslint: react/jsx-boolean-value``
  ```ruby
  // ❌
  <Foo
    hidden={true}
  />

  // ✅
  <Foo
    hidden
  />

  // ✅
  <Foo hidden />
  ```
  
+ Always include an alt prop on ``<img>`` tags. If the image is presentational, alt can be an empty string or the ``<img>`` must have      ``role="presentation"``. ``eslint: jsx-a11y/alt-text``
  ```ruby
  // ❌
  <img src="hello.jpg" />

  // ✅
  <img src="hello.jpg" alt="Me waving hello" />

  // ✅
  <img src="hello.jpg" alt="" />

  // ✅
  <img src="hello.jpg" role="presentation" />
  ```
  
+ Do not use words like “image”, “photo”, or “picture” in ``<img>`` alt props. ``eslint: jsx-a11y/img-redundant-alt``
  Why...? Screenreaders already announce ``img`` elements as images, so there is no need to include this information in the alt text.
  ```ruby
  // ❌
  <img src="hello.jpg" alt="Picture of me waving hello" />

  // ✅
  <img src="hello.jpg" alt="Me waving hello" />
  ```
  
+ Avoid using an array index as key prop, prefer a unique ID. [Why](https://robinpokorny.medium.com/index-as-a-key-is-an-anti-pattern-e0349aece318)
  ```ruby
  // ❌
  {todos.map((todo, index) =>
    <Todo
      {...todo}
      key={index}
    />
  )}

  // ✅
  {todos.map(todo => (
    <Todo
      {...todo}
      key={todo.id}
    />
  ))}
  ```
  
+ Prefer destructuring properties so it is clear what properties are used in the component.
  ```ruby
  // ❌
  const Button = (props) => {
    return <button>{props.text}</button>;
  };

  // ✅
  const Button = (props) => {
    const { text } = props;

    return <button>{text}</button>;
  };

  // ✅
  const Button = ({ text }) => {
    return <button>{text}</button>;
  };
  ```

+ Spreading objects with known, explicit props. This can be particularly useful when testing React components with Mocha’s beforeEach construct.
  ```ruby
  // ❌
  const Menu = (props) => {
    const { irrelevantProp, ...relevantProps  } = props;
    return <WrappedComponent {...props} />
  }
  
  // ✅
  const Menu = (props) => {
    const { irrelevantProp, ...relevantProps  } = props;
    return <WrappedComponent {...relevantProps} />
  }
  ```
  
## PLACE_HOLDER
+ Separate function from the JSX if it takes more than 1 line
  ```ruby
  // ❌
  <button
    onClick={() => {
      setState(!state);
      resetForm();
      reloadData();
    }}
  />

  // ✅
  <button onClick={() => setState(!state)} />

  // ✅
  const handleButtonClick = () => {
    setState(!state);
    resetForm();
    reloadData();
  }

  <button onClick={handleButtonClick} />
  ```

## Component structure
+ 
  ```ruby
  // 1. Imports - Prefer destructuring imports to minimize writen code
  import React, { PropsWithChildren, useState, useEffect } from "react";

  // 2. Types
  type ComponentProps = {
    someProperty: string;
  };

  // 3. Styles - with @mui use styled API or sx prop of the component
  const Wrapper = styled("div")(({ theme }) => ({
    color: theme.palette.white
  }));

  // 4. Additional variables
  const SOME_CONSTANT = "something";

  // 5. Component
  function Component({ someProperty }: PropsWithChildren<ComponentProps>) {
  
  // 5.1 Definitions
    const [state, setState] = useState(true);
    const { something } = useSomething();

    // 5.2 Functions
    function handleToggleState() {
      setState(!state);
    }

    // 5.3 Effects
    // ❌
    React.useEffect(() => {
      // ...
    }, []);

    // ✅
    useEffect(() => {
      // ...
    }, []);

    // 5.5 Additional destructures
    const { property } = something;

    return (
      <div>
        {/* Separate elements if not closed on the same line to make the code clearer */}
        {/* ❌ */}
        <div>
          <div>
            <p>Lorem ipsum</p>
            <p>Pellentesque arcu</p>
          </div>
          <p>Lorem ipsum</p>
          <p>Pellentesque arcu</p>
        </div>
        <div>
          <p>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Pellentesque
            arcu. Et harum quidem rerum facilis est et expedita distinctio.
          </p>
          <p>Pellentesque arcu</p>
          <p>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Pellentesque
            arcu. Et harum quidem rerum facilis est et expedita distinctio.
          </p>
        </div>

        {/* ✅ */}
        <Wrapper>
          <div>
            <p>Lorem ipsum</p>
            <p>Pellentesque arcu</p>
          </div>

          <p>Lorem ipsum</p>
          <p>Pellentesque arcu</p>
        </Wrapper>

        <div>
          <div>
            <p>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
              Pellentesque arcu. Et harum quidem rerum facilis est et expedita
              distinctio.
            </p>

            <p>Pellentesque arcu</p>

            <p>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
              Pellentesque arcu. Et harum quidem rerum facilis est et expedita
              distinctio.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 6. Exports
  export { Component };
  export type { ComponentProps };
  ```
  
  ## Hooks
  ```ruby
  // ❌
  const ScreenDimensions = () => {
    const [windowSize, setWindowSize] = useState({
      width: undefined,
      height: undefined
   });

    useEffect(() => {
      function handleResize() {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight
        });
      }

      window.addEventListener("resize", handleResize);
      handleResize();
  
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
      <>
        <p>Current screen width: {windowSize.width}</p>
        <p>Current screen height: {windowSize.height}</p>
      </>
    );
  };

  // ✅
  const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
      width: undefined,
      height: undefined
    });

    useEffect(() => {
      function handleResize() {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight
        });
      }

      window.addEventListener("resize", handleResize);
      handleResize();

      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowSize;
  };

  const ScreenDimensions = () => {
    const windowSize = useWindowSize();

    return (
      <>
        <p>Current screen width: {windowSize.width}</p>
        <p>Current screen height: {windowSize.height}</p>
      </>
    );
  };
  
  ```
  
  ## Avoid using huge component
  ```ruby
  // ❌
  const Section = ({ isEditable, value }) => {
    if (isEditable) {
      return (
        <Section>
          <Title>Edit this content</Title>
          <Content>{value}</Content>
          <Button>Clear content</Button>
        </Section>
      );
    }

    return (
      <Section>
        <Title>Read this content</Title>
        <Content>{value}</Content>
      </Section>
    );
  };
  
  // ✅
  const EditableSection = ({ value }) => {
    return (
      <Section>
        <Title>Edit this content</Title>
        <Content>{value}</Content>
        <Button>Clear content</Button>
      </Section>
    );
  };

  const DetailSection = ({ value }) => {
    return (
      <Section>
        <Title>Read this content</Title>
        <Content>{value}</Content>
      </Section>
    );  
  };

  const SomeSection = ({ isEditable, value }) => {
    return isEditable ? (
      <EditableSection value={value} />
    ) : (
      <DetailSection value={value} />
    );
  };
  ```
  
