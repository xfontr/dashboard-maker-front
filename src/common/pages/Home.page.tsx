import { AnimatedButton } from "../components/Button/Button";
import Form from "../components/Form/Form";
import schema from "../test-utils/mocks/mockFormSchema";

const HomePage = () => (
  <Form {...{ schema }}>
    <AnimatedButton>Mock in</AnimatedButton>
  </Form>
);

export default HomePage;
