import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { PAGE_SIZE } from "../utils/globalConstants";

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
  color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

function Pagination({ count }) {
  const [searchParams, setSeacrhParams] = useSearchParams();

  const current = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 1;
  const pageCount = Math.ceil(count / PAGE_SIZE);
  const nextPage = () => {
    const next = pageCount === current ? current : current + 1;

    searchParams.set("page", next);
    setSeacrhParams(searchParams);
  };
  const previouspage = () => {
    const previous = current === 1 ? current : current - 1;
    searchParams.set("page", previous);
    setSeacrhParams(searchParams);
  };
  if (count <= PAGE_SIZE) return null;
  return (
    <StyledPagination>
      <P>
        Showing <span>{PAGE_SIZE * (current - 1) + 1}</span> to{" "}
        <span>{current == pageCount ? count : current * PAGE_SIZE}</span> of{" "}
        <span>{count}</span> results
      </P>
      <Buttons>
        <PaginationButton onClick={previouspage} disabled={current == 1}>
          <HiChevronLeft />
          previous
        </PaginationButton>
        <PaginationButton onClick={nextPage} disabled={current == pageCount}>
          <HiChevronRight />
          next
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  );
}

export default Pagination;
