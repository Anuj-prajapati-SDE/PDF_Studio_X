import React from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Card, 
  CardContent,
  Avatar, 
  Button, 
  Paper, 
  Stack,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  alpha,
  useTheme 
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { 
  CheckCircle as CheckCircleIcon,
  Clock as ClockIcon,
  Users as UsersIcon,
  Award as AwardIcon,
  Shield as ShieldIcon,
  Star as StarIcon,
  ArrowRight as ArrowRightIcon,
  Coffee as CoffeeIcon,
  Code as CodeIcon,
  Zap as ZapIcon,
  Globe as GlobeIcon,
//   FilePdf as FilePdfIcon,
} from 'react-feather';
import { motion } from 'framer-motion';

const AboutPage = () => {
  const theme = useTheme();
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  const teamMembers = [
    {
      name: "Anuj Prajapati",
      role: "Founder & Lead Developer",
      bio: "Full-stack developer with 8+ years experience specializing in document processing and cloud infrastructure.",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Sarah Johnson",
      role: "UX/UI Designer",
      bio: "Award-winning designer passionate about creating intuitive and accessible user experiences.",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Michael Chen",
      role: "Backend Engineer",
      bio: "PDF technology expert with extensive knowledge in document security and conversion algorithms.",
      avatar: "https://randomuser.me/api/portraits/men/46.jpg",
    },
    {
      name: "Emily Rodriguez",
      role: "Product Manager",
      bio: "Former Adobe product manager with deep understanding of document workflows and user needs.",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    },
  ];
  
  const missionPoints = [
    "Provide accessible, high-quality PDF tools for everyone",
    "Prioritize user privacy and document security",
    "Continuously innovate based on user feedback",
    "Maintain a simple and intuitive user experience",
  ];
  
  const milestones = [
    {
      year: "2023",
      title: "Launch of PDF Utility 2.0",
      description: "Complete redesign with faster processing and new features."
    },
    {
      year: "2022",
      title: "1 Million Users Milestone",
      description: "Reached our first million users across 150+ countries."
    },
    {
      year: "2021",
      title: "PDF Utility API Release",
      description: "Launched developer API for enterprise integrations."
    },
    {
      year: "2020",
      title: "Company Founded",
      description: "Started with a simple PDF merger tool and expanded from there."
    },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #4361ee 0%, #3a0ca3 100%)',
          color: 'white',
          py: { xs: 8, md: 12 },
          mb: 8,
          borderRadius: 4,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background decorative elements */}
        <Box
          sx={{
            position: 'absolute',
            top: '10%',
            left: '5%',
            width: '30rem',
            height: '30rem',
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
            borderRadius: '50%',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '5%',
            right: '10%',
            width: '20rem',
            height: '20rem',
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
            borderRadius: '50%',
          }}
        />
        
        <Container maxWidth="lg">
          <motion.div variants={itemVariants}>
            <Typography 
              variant="overline" 
              component="div" 
              sx={{ 
                opacity: 0.9,
                letterSpacing: 2,
                mb: 2,
              }}
            >
              ABOUT US
            </Typography>
            
            <Typography 
              variant="h2" 
              component="h1" 
              fontWeight={800} 
              sx={{ mb: 3 }}
            >
              We Make PDF Management <Box component="span" sx={{ color: '#7df9ff' }}>Simple</Box>
            </Typography>
            
            <Typography 
              variant="h6" 
              sx={{ 
                maxWidth: 800, 
                mb: 4, 
                opacity: 0.9,
                fontWeight: 400,
              }}
            >
              PDF Utility was created with a clear mission: to provide accessible, powerful document tools that anyone can use. We believe that working with PDFs shouldn't require expensive software or technical expertise.
            </Typography>
          </motion.div>
        </Container>
      </Box>
      
      {/* Our Story Section */}
      <Container maxWidth="lg">
        <Grid container spacing={8} alignItems="center" sx={{ mb: 10 }}>
          <Grid item xs={12} md={6}>
            <motion.div variants={itemVariants}>
              <Typography 
                variant="h3" 
                component="h2" 
                fontWeight={700} 
                sx={{ mb: 3 }}
              >
                Our Story
              </Typography>
              
              <Typography variant="body1" paragraph>
                PDF Utility started in 2020 when our founder, Anuj Prajapati, was working on a project that required merging hundreds of PDF documents. Frustrated by the limitations and costs of existing solutions, he created a simple tool for his personal use.
              </Typography>
              
              <Typography variant="body1" paragraph>
                What began as a personal project quickly grew as colleagues and friends asked to use the tool. Recognizing the need for accessible PDF tools, we expanded the functionality and launched PDF Utility as a free service to help others facing similar challenges.
              </Typography>
              
              <Typography variant="body1" paragraph>
                Today, PDF Utility serves millions of users worldwide, from students and teachers to professionals and businesses of all sizes. We're proud to offer powerful tools that respect user privacy while remaining simple enough for anyone to use.
              </Typography>
              
              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Our Mission
                </Typography>
                
                <List disablePadding>
                  {missionPoints.map((point, index) => (
                    <ListItem key={index} disablePadding sx={{ mb: 1.5 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <CheckCircleIcon size={20} color={theme.palette.primary.main} />
                      </ListItemIcon>
                      <ListItemText primary={point} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </motion.div>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <motion.div variants={itemVariants}>
              <Box
                component="img"
                src="https://source.unsplash.com/random/600x400/?team,technology,office"
                alt="Our Team Working"
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 4,
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                }}
              />
            </motion.div>
          </Grid>
        </Grid>
        
        {/* Company Values */}
        <motion.div variants={itemVariants}>
          <Typography 
            variant="h3" 
            component="h2" 
            fontWeight={700} 
            align="center" 
            sx={{ mb: 2 }}
          >
            Our Values
          </Typography>
          
          <Typography 
            variant="body1" 
            color="text.secondary" 
            align="center" 
            sx={{ mb: 6, maxWidth: 800, mx: 'auto' }}
          >
            These core principles guide everything we do, from product development to customer support
          </Typography>
          
          <Grid container spacing={3}>
            {[
              {
                icon: <ShieldIcon size={32} color={theme.palette.primary.main} />,
                title: "Privacy First",
                description: "We process files in your browser whenever possible and never store your documents on our servers longer than necessary.",
              },
              {
                icon: <ZapIcon size={32} color={theme.palette.warning.main} />,
                title: "Simplicity",
                description: "We believe powerful tools don't have to be complicated. Our interfaces are designed to be intuitive and easy to use.",
              },
              {
                icon: <AwardIcon size={32} color={theme.palette.error.main} />,
                title: "Quality",
                description: "We're committed to delivering high-quality results across all our tools, with regular updates and improvements.",
              },
              {
                icon: <UsersIcon size={32} color={theme.palette.success.main} />,
                title: "Accessibility",
                description: "We strive to make our tools accessible to everyone, regardless of technical skill or financial resources.",
              },
            ].map((value, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card 
                  elevation={0}
                  sx={{ 
                    height: '100%', 
                    borderRadius: 4,
                    p: 3,
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                    },
                  }}
                >
                  <Box sx={{ mb: 2 }}>
                    {value.icon}
                  </Box>
                  <Typography variant="h6" component="h3" gutterBottom fontWeight={600}>
                    {value.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {value.description}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </motion.div>
        
        {/* Company Milestones */}
        <Box sx={{ mt: 12, mb: 10 }}>
          <motion.div variants={itemVariants}>
            <Typography 
              variant="h3" 
              component="h2" 
              fontWeight={700} 
              align="center" 
              sx={{ mb: 2 }}
            >
              Our Journey
            </Typography>
            
            <Typography 
              variant="body1" 
              color="text.secondary" 
              align="center" 
              sx={{ mb: 6, maxWidth: 800, mx: 'auto' }}
            >
              Key milestones in our growth from a simple tool to a comprehensive PDF platform
            </Typography>
          </motion.div>
          
          <Box sx={{ position: 'relative' }}>
            {/* Timeline line */}
            <Box 
              sx={{ 
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: { xs: 30, sm: '50%' },
                width: 2,
                bgcolor: 'divider',
                transform: { xs: 'none', sm: 'translateX(-1px)' },
                zIndex: 0,
              }} 
            />
            
            {/* Timeline items */}
            {milestones.map((milestone, index) => (
              <Box
                key={index}
                component={motion.div}
                variants={itemVariants}
                sx={{ 
                  display: 'flex',
                  flexDirection: { xs: 'row', sm: index % 2 === 0 ? 'row' : 'row-reverse' },
                  mb: 6,
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                {/* Year marker - always visible */}
                <Box 
                  sx={{ 
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    bgcolor: 'primary.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 700,
                    fontSize: '1.2rem',
                    flexShrink: 0,
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
                    position: { xs: 'absolute', sm: 'relative' },
                    left: { xs: 0, sm: 'auto' },
                    transform: { xs: 'none', sm: index % 2 === 0 ? 'translateX(50%)' : 'translateX(-50%)' },
                    zIndex: 2,
                  }}
                >
                  {milestone.year}
                </Box>
                
                {/* Content card */}
                <Card
                  sx={{
                    borderRadius: 4,
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                    ml: { xs: 8, sm: index % 2 === 0 ? 2 : 'auto' },
                    mr: { xs: 0, sm: index % 2 === 0 ? 'auto' : 2 },
                    width: { xs: 'calc(100% - 60px)', sm: '45%' },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                      {milestone.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {milestone.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
        </Box>
        
        {/* Team Section */}
        <Box sx={{ mb: 12 }}>
          <motion.div variants={itemVariants}>
            <Typography 
              variant="h3" 
              component="h2" 
              fontWeight={700} 
              align="center" 
              sx={{ mb: 2 }}
            >
              Meet Our Team
            </Typography>
            
            <Typography 
              variant="body1" 
              color="text.secondary" 
              align="center" 
              sx={{ mb: 6, maxWidth: 800, mx: 'auto' }}
            >
              The talented people behind PDF Utility who make it all possible
            </Typography>
            
            <Grid container spacing={4}>
              {teamMembers.map((member, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Card 
                    elevation={0}
                    sx={{ 
                      borderRadius: 4,
                      overflow: 'visible',
                      height: '100%',
                      boxShadow: 'none',
                      border: '1px solid',
                      borderColor: 'divider',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)',
                      },
                    }}
                  >
                    <Box sx={{ p: 3, textAlign: 'center' }}>
                      <Avatar
                        src={member.avatar}
                        alt={member.name}
                        sx={{
                          width: 100,
                          height: 100,
                          mx: 'auto',
                          mb: 2,
                          border: '4px solid white',
                          boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
                        }}
                      />
                      <Typography variant="h6" fontWeight={600}>
                        {member.name}
                      </Typography>
                      <Typography variant="subtitle2" color="primary.main" gutterBottom>
                        {member.role}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {member.bio}
                      </Typography>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Box>
        
        {/* Stats Section */}
        <Box 
          sx={{ 
            mb: 12,
            py: 8,
            px: 4, 
            borderRadius: 4,
            bgcolor: 'background.default',
            textAlign: 'center',
          }}
        >
          <motion.div variants={itemVariants}>
            <Typography variant="h4" component="h2" fontWeight={700} gutterBottom>
              PDF Utility by the Numbers
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 6 }}>
              Our growth and impact since launching in 2020
            </Typography>
            
            <Grid container spacing={4} justifyContent="center">
              {[
                { value: "1M+", label: "Monthly Users", icon: <UsersIcon size={24} color={theme.palette.primary.main} /> },
                { value: "50M+", label: "PDFs Processed", icon: '' },
                { value: "150+", label: "Countries", icon: <GlobeIcon size={24} color={theme.palette.success.main} /> },
                { value: "99.9%", label: "Uptime", icon: <ClockIcon size={24} color={theme.palette.warning.main} /> },
              ].map((stat, index) => (
                <Grid item xs={6} md={3} key={index}>
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'center',
                    }}
                  >
                    <Box 
                      sx={{ 
                        mb: 2,
                        width: 60,
                        height: 60,
                        borderRadius: '50%',
                        bgcolor: 'background.paper',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.08)',
                      }}
                    >
                      {stat.icon}
                    </Box>
                    <Typography variant="h3" fontWeight={700} sx={{ mb: 1 }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stat.label}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Box>
        
        {/* CTA Section */}
        <motion.div variants={itemVariants}>
          <Box
            sx={{
              p: { xs: 4, md: 8 },
              borderRadius: 4,
              backgroundImage: 'linear-gradient(135deg, #4361ee 0%, #3a0ca3 100%)',
              color: 'white',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
              mb: 6,
            }}
          >
            {/* Background decorative elements */}
            <Box
              sx={{
                position: 'absolute',
                top: '20%',
                left: '10%',
                width: '15rem',
                height: '15rem',
                background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
                borderRadius: '50%',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: '10%',
                right: '10%',
                width: '10rem',
                height: '10rem',
                background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
                borderRadius: '50%',
              }}
            />
            
            <Typography 
              variant="h3" 
              fontWeight={700} 
              sx={{ mb: 3 }}
            >
              Ready to Try PDF Utility?
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9, maxWidth: 700, mx: 'auto' }}>
              Join millions of users who trust our tools for their PDF needs. Start for free today.
            </Typography>
            <Button
              variant="contained"
              size="large"
              component={RouterLink}
              to="/tools/merge-pdf"
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                borderRadius: '50px',
                px: 6,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 600,
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.9)',
                },
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
              }}
            >
              Try Our PDF Tools
            </Button>
          </Box>
        </motion.div>
      </Container>
    </motion.div>
  );
};

export default AboutPage;