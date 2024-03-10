package aws_prof_imgs

import (
	"bytes"
	"context"

	"net/http"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
)

// S3Uploader provides methods to upload images to AWS S3.
type S3Uploader struct {
	s3Client *s3.S3
	bucket   string
}

// NewS3Uploader creates a new S3Uploader instance.
func NewS3Uploader(bucket string) (*S3Uploader, error) {
	// Initialize an AWS session and S3 client
	sess, err := session.NewSession(&aws.Config{
		Region: aws.String("us-east-1"),
		Credentials: credentials.NewStaticCredentials("AKIA3FLD4G6CQNG6EKGB", "6AGEYyOLBNcfCVjcJhg3to3sPc6GTNGWMDKWt4d+", " "),
	})
	if err != nil {
		return nil, err
	}

	s3Client := s3.New(sess)

	return &S3Uploader{
		s3Client: s3Client,
		bucket:   bucket,
	}, nil
}

func (upload *S3Uploader) UploadPicture(ctx context.Context, pictureData []byte, contentType string, key string) error {
	buffer := bytes.NewReader(pictureData)

	if contentType == "" {
		contentType = http.DetectContentType(pictureData)
	}

	_, err := upload.s3Client.PutObjectWithContext(ctx, &s3.PutObjectInput{
		Bucket:	aws.String(upload.bucket),
		Key:	aws.String(key),
		Body: 	buffer,
		ContentType: aws.String(contentType),
	})
	if err != nil{
		return err
	}

	return nil
}