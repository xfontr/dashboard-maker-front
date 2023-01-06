import Form from "./common/components/Form/Form";
import { AnimatedButton } from "./common/components/Button/Button";
import mockFormSchema from "./common/test-utils/mocks/mockFormSchema";

const App = (): JSX.Element => {
  return (
    <div className="app">
      <Form schema={mockFormSchema}>
        <AnimatedButton>Log in</AnimatedButton>
      </Form>
    </div>
  );
};

export default App;
