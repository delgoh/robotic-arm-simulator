export const pages = [
  {
    header: "Welcome to Robot Arm Simulator!",
    body: "This application allows you to visualize how the Denavit-Hartenberg convention is used to describe the pose of every link in a multi-linkage robot arm."
  },
  {
    header: "What are Denavit-Hartenberg (DH) parameters?",
    body: "DH parameters are sets of 4 variables that define the position and orientation of each link in a robot arm. This is achieved by following certain rules to assign a new coordinate system (reference frame) to each robot link. This application shows the resultant coordinate frames based on the inputted parameters."
  },
  {
    header: "Why use DH parameters?",
    body: "A line in 3D space can be fully defined using 6 parameters (3 for position, 3 for direction). However, by using the D-H convention, only 4 parameters are required to define the line. This is very useful in robotics where components in series are involved (e.g. robot arm) as it simplifies the kinematic and dynamic analyses of the system."
  },
  {
    header: "What are the rules to the DH convention?",
    body: "The reference frames are assigned to each robot link sequentially, following these rules:\n1) z-axis in direction of joint axis,\n2*) x-axis parallel to common normal of this & previous z-axes, and\n3) y-axis follows right-hand rule based on x- and z-axes.\n(*Note: if both z-axes are parallel (i.e. no common normal), x-axis can be assigned anywhere. It is common practice to have it parallel to previous x-axis to reduce non-zero parameters, and to assign anywhere along "
  },
  {
    header: "How to use this simulator? (1/2)",
    body: "Key in the DH parameters on the left panel.\nThe resultant coordinate systems will be displayed accordingly.\nYou may also choose to display the relative (from the previous link) or global (from the origin) transformation matrices of each frame."
  }
];

