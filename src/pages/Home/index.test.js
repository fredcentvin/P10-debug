import { fireEvent, render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import Home from "./index";
import { useData } from "../../contexts/DataContext";

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await screen.findByText("Message envoyé !");
    });
  });

});


describe("When a page is created", () => {
  it("a list of events is displayed", async () => {
   
    const { container } = render(<Home />);
      setTimeout(() => {
      const realisation = container.querySelector("#realisationTitle");
      expect(realisation.innerHTML).toEqual("Nos réalisations");
      const events = container.querySelector("#events");
      expect(events).toBeInTheDocument();
  }, 100);
    
  })
  it("a list a people is displayed",async () => {
    render(<Home />)
    await screen.findByText("Alice")
    await screen.findByText("CEO")
    await screen.findByText("Samira")
    await screen.findByText("Jean-baptiste")
  })
    
  it("a footer is displayed", () => {
    render(<Home />)
    const footer = screen.getByTestId("footer");
    expect(footer).toBeInTheDocument();
  })
  it("an event card, with the last event, is displayed", async () => {
    render(<Home />);
    setTimeout(() => {
        const { last } = useData();
        screen.findByTestId("event-card");
        screen.findByText(last.title);
    }, 100);
  })
})