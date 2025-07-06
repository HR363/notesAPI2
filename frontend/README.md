# Notes Pro Frontend

A modern Angular application for managing notes .

## Features

- ✨ Modern UI
- 📝 Create, read, update, and delete notes
- 🎨 Beautiful animations and transitions
- 📱 Responsive design for all devices
- 🔔 Toast notifications for user feedback
- ⚡ Real-time updates and smooth interactions

## Tech Stack

- **Framework**: Angular 18
- **Styling**: Tailwind CSS v3
- **HTTP Client**: Angular HttpClient
- **TypeScript**: Strict mode enabled

## Prerequisites

- Node.js (v18 or higher)
- Angular CLI
- Backend API running on `http://localhost:3000`

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   ng serve
   ```

3. **Open your browser:**
   Navigate to `http://localhost:4200`

## Development

- **Build for production:**
  ```bash
  ng build
  ```

- **Run tests:**
  ```bash
  ng test
  ```

- **Lint the code:**
  ```bash
  ng lint
  ```

## API Integration

The frontend connects to the NestJS backend API running on `http://localhost:3000`. Make sure your backend is running before using the frontend.

### API Endpoints Used

- `GET /notes` - Fetch all notes
- `POST /notes` - Create a new note
- `PATCH /notes/:id` - Update a note
- `DELETE /notes/:id` - Delete a note

## UI Features

### Design System
- **Color Scheme**: Dark theme with blue/purple gradients
- **Typography**: Clean, modern fonts with proper hierarchy
- **Spacing**: Consistent spacing using Tailwind's spacing scale
- **Animations**: Smooth transitions and hover effects

### Components
- **Header**: Branded header with "New Note" button
- **Note Cards**: Interactive cards with hover effects
- **Modal**: Create/edit note modal with form validation
- **Toast Notifications**: Success/error feedback messages
- **Loading States**: Spinner for data loading
- **Empty State**: Encouraging message when no notes exist

### Responsive Design
- Mobile-first approach
- Grid layout adapts to screen size
- Touch-friendly interactions
- Optimized for all device types

## Customization

### Colors
The color scheme can be customized by modifying the Tailwind classes in the HTML templates. The current theme uses:
- Primary: Blue (`blue-500`, `blue-600`, `blue-700`)
- Secondary: Purple (`purple-600`, `purple-700`)
- Background: Gray (`gray-800`, `gray-900`)
- Text: Gray (`gray-100`, `gray-300`, `gray-500`)

### Animations
Custom animations are defined in `app.css` and can be modified to change the feel of the application.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Follow the existing code style
2. Use TypeScript strict mode
3. Add proper error handling
4. Test your changes thoroughly
5. Update documentation as needed
