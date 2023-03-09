export const pages = [
  {
    header: "Welcome to Robot Arm Simulator!",
    body: "This application allows you to visualize how the Denavit-Hartenberg convention is used to describe the pose of every link in a multi-linkage robot arm."
  },
  {
    header: "What are Denavit-Hartenberg (DH) parameters?",
    body: "DH parameters are sets of 4 variables (\u03B8, d, r, \u03B1) that define the position and orientation of each link in a robot arm. This is achieved by following certain rules to assign a new coordinate system (reference frame) to each robot link.\n\nThis application shows the resultant coordinate frames based on the inputted parameters."
  },
  {
    header: "Why use DH parameters?",
    body: "A line in 3D space can be fully defined using 6 parameters (3 for position, 3 for direction). However, by using the D-H convention, only 4 parameters are required to define the line.\n\nThis is very useful in robotics where components in series are involved (e.g. robot arm) as it simplifies the kinematic and dynamic analyses of the system."
  },
  {
    header: "What are the rules to the DH convention?",
    body: "The reference frames are assigned to each robot link sequentially, following these rules:\n\t\u25CF\t z-axis in direction of joint axis,\n\t\u25CF\t x-axis parallel to common normal of this & previous z-axes*, and\n\t\u25CF\t y-axis follows right-hand rule based on x- and z-axes.\n\n(*Note: If both z-axes are parallel (i.e. no common normal), x-axis can be assigned anywhere. It is common practice to have it parallel to previous x-axis to reduce non-zero parameters, and the length d can be chosen based on convenience.)"
  },
  {
    header: "How to use this simulator? (1/3)",
    body: "Key in the DH parameters on the left panel. The resultant coordinate systems will be displayed accordingly.\n\nYou may also choose to display the relative (from the previous link) or global (from the origin) transformation matrices of each frame."
  },
  {
    header: "How to use this simulator? (2/3)",
    body: "Select the joint type for each of the links to assign the respective joint variables. You may toggle between revolute (joint variable \u03B8) or prismatic (joint variable d) to enable input click-and-drag mode by dragging the arrows.\n\nOther types of robotic joints can be represented through a combination of multiple revolute and/or prismatic joints (e.g. spherical joint represented as 3 revolutes, cylindrical joint represented as 1 prismatic and 1 revolute)."
  },
  {
    header: "How to use this simulator? (3/3)",
    body: "To visualize how each parameter affects the overall robot arm, animate either by links (sets of 4 parameters) or by individual parameters to see the respective transformations."
  }
];

