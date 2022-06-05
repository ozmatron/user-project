import { render } from "@testing-library/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserTable from "../UserTable";

describe('Test api calls', () => {
    it('UserTable api call made', () => {
      const fetchSpy = jest.spyOn(window, 'fetch');
      const UserDetailInstance = render(
      <BrowserRouter>
        <Routes>   
            <Route path="*" element= {<UserTable />}/>
        </Routes>
      </BrowserRouter>
      );
      expect(fetchSpy).toBeCalled();
    });
  });