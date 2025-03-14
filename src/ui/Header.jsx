import styled from "styled-components";
import useLgout from "../features/authentication/useLgout";

const StyledHeader = styled.header`
  border-bottom: 1px solid var(--color-grey-100);
  padding: 1.4rem 2.8rem;
  background-color: var(--color-grey-0);
`;
function Header() {
  const { isPending, mutate } = useLgout();
  return (
    <StyledHeader>
      <button onClick={() => mutate()} disabled={isPending}>
        Logout
      </button>
    </StyledHeader>
  );
}

export default Header;
