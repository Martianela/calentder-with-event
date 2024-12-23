
# Event Calendar  

## Overview  
A simple and interactive Event Calendar application where you can add, view, and delete events. Events are categorized as Work, Personal, or Other, with color-coded indicators for easy identification.  

## Features  
- Add events with a name, time, description, and category.  
- View events on the selected date.  
- Delete events as needed.  
- Events are stored in the browser using `localStorage`.  
- Dates with a **red dot** indicate that events are scheduled on that day.  

## Usage  
1. **View Events:** Select any date on the calendar to see associated events.  
2. **Add Event:** Click a date to open the modal, fill in the event details, and save.  
3. **Delete Event:** Use the delete button next to an event in the event list.  
4. **Color-Coded Categories:**  
   - Work: Blue  
   - Personal: Green  
   - Other: Gray  

## Setup  
1. Clone the repository:  
   ```bash
   git clone <repository-url>
   ```  
2. Install dependencies:  
   ```bash
   npm install  
   ```  
3. Start the application:  
   ```bash
   npm run dev
   ```
